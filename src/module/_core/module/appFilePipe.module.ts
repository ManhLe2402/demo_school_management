import { DynamicModule, Module, PipeTransform } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";

@Module({})
export class AppFilePipeModule {
    static appFiles: Array<new () => PipeTransform> = [];

    static forRoot(appFiles: Array<new () => PipeTransform>): DynamicModule {
        this.appFiles = appFiles;
        return {
            module: AppFilePipeModule,
            providers: this.appFiles.map((appFile) => ({
                provide: APP_PIPE,
                useClass: appFile
            }))
        };
    }

    static forFeature(appFiles: Array<new () => PipeTransform>): DynamicModule {
        return {
            module: AppFilePipeModule,
            providers: appFiles.map((appFile) => ({
                provide: APP_FILTER,
                useClass: appFile
            }))
        };
    }
}
