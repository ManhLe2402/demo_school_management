import { createReadStream, createWriteStream, ensureDir, move, rename, unlink } from "fs-extra";
import { resolve } from "path";

export class LocalFileService {
    TMP_RELATIVE_DIR = ".tmp";
    IMAGE_RELATIVE_DIR = "public/images";

    TMP_DIR = resolve(global.__rootDir, this.TMP_RELATIVE_DIR);
    IMAGE_DIR = resolve(global.__rootDir, this.IMAGE_RELATIVE_DIR);

    constructor() {
        ensureDir(this.TMP_DIR);
        ensureDir(this.IMAGE_DIR);
    }

    removeImage = async (imageFilePath: string) => {
        if (!imageFilePath) return;
        const path = resolve(this.IMAGE_DIR, imageFilePath);
        await unlink(path);
    };

    moveTmpToImageUpload = async (tmpFileName: string, uploadImageFilePath: string) => {
        const oldPath = resolve(this.TMP_DIR, tmpFileName);
        const newPath = resolve(this.IMAGE_DIR, uploadImageFilePath);

        try {
            await rename(oldPath, newPath);
        } catch (err) {
            if (err.code === "EXDEV") {
                await move(oldPath, newPath);
            } else {
                unlink(oldPath);
                throw err;
            }
        }
    };

    copy = (oldPath: string, newPath: string, cb = (error: Error) => {}) => {
        const readStream = createReadStream(oldPath);
        const writeStream = createWriteStream(newPath, {});

        readStream.on("error", cb);
        writeStream.on("error", cb);

        readStream.on("close", function () {
            unlink(oldPath, cb);
        });

        readStream.pipe(writeStream);
    };
}
