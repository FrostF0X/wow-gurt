import {file} from "tmp-promise";
import * as ffmpeg from "fluent-ffmpeg";
import {readFile} from "fs/promises";
import * as downloader from "image-downloader";
import {execFile, ExecFileException} from "child_process";
import S3 from "./S3";


const s3 = new S3();
export default class Scaler {
    public static async scale(url: string, size: number) {
        const originalTmp = await file({postfix: '.gif'});
        const resizedTmp = await file({postfix: '.gif'});
        const minifiedTmp = await file({postfix: '.gif'});
        await downloader.image({
            url,
            dest: originalTmp.path
        });
        await new Promise((resolve, reject) =>
            ffmpeg(originalTmp.path)
                .outputOptions(['-vf', `fps=25,scale=${size}:${size},split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer`])
                .output(resizedTmp.path)
                .on('end', resolve)
                .on('error', reject)
                .run()
        );
        await new Promise(
            (resolve, reject) =>
                execFile('gifsicle', [`-O3`, `--lossy=80`, '-o', minifiedTmp.path, resizedTmp.path], (error: ExecFileException | null) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true)
                })
        );
        const res = await s3.upload(await readFile(minifiedTmp.path));
        await originalTmp.cleanup();
        await resizedTmp.cleanup();
        await minifiedTmp.cleanup();
        return res;
    }
}
