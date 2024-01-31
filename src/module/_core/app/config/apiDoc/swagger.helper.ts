import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export class SwaggerHelper {
    static filterAdminDoc(doc: OpenAPIObject) {
        const adminPath = {};

        Object.entries(doc.paths).map(([pathKey, pathItemObject]) => {
            Object.entries(pathItemObject).forEach(([pathItemObjectKey, value]) => {
                const isAdminTag = value.tags?.includes("_Admin") || value.tags?.includes("_Common");
                if (isAdminTag) {
                    if (!adminPath[pathKey]) adminPath[pathKey] = {};
                    adminPath[pathKey][pathItemObjectKey] = {
                        ...value,
                        tags: value.tags.filter((tag) => tag != "_Admin" && tag != "_Common")
                    };
                }
            });
        });

        const publicDoc = { ...doc, paths: adminPath };
        return publicDoc;
    }

    static filterClientDoc(doc: OpenAPIObject) {
        const adminPath = {};

        Object.entries(doc.paths).map(([pathKey, pathItemObject]) => {
            Object.entries(pathItemObject).forEach(([pathItemObjectKey, value]) => {
                const isClientTag = value.tags && !value.tags.includes("_Admin");
                if (isClientTag) {
                    if (!adminPath[pathKey]) adminPath[pathKey] = {};
                    adminPath[pathKey][pathItemObjectKey] = {
                        ...value,
                        tags: value.tags.filter((tag) => tag != "_Common")
                    };
                }
            });
        });

        const publicDoc = { ...doc, paths: adminPath };
        return publicDoc;
    }

    static buildSwagger = (app) => {
        const config = new DocumentBuilder()
            .setTitle("Mapstudy API")
            .setDescription("")
            .addCookieAuth("Authentication")
            .addBearerAuth()
            .setVersion("1.0")
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("swagger", app, this.filterClientDoc(document), {
            swaggerOptions: { defaultModelsExpandDepth: -1, defaultModelExpandDepth: 3 }
        });

        SwaggerModule.setup("admin/swagger", app, this.filterAdminDoc(document), {
            swaggerOptions: { defaultModelsExpandDepth: -1, defaultModelExpandDepth: 3 }
        });
    };
}
