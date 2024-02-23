/**
 * Весь компонент один большой кринге, но, как иначе сделать, я не знаю
 */

import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { HStack } from 'shared/UI/Stack';
import AvatarEditor from 'react-avatar-editor';
import { Knob } from 'primereact/knob';
import classes from './ImagePreview.module.scss';

interface ImagePreviewProps {
    className?: string;
    setBlob: (file: Blob) => void;
}

export const ImagePreview = memo((props: ImagePreviewProps) => {
    const { className, setBlob } = props;

    const { t } = useTranslation('image-uploader');
    const editorRef = useRef<AvatarEditor>(null);

    const [file, setFile] = useState<string>();
    const [scale, setScale] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(1);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event?.target?.files) {
            const file: string = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
            const base64Url = canvas.split(',')[1];

            const mimeType = canvas.split(',')[0].split(':')[1].split(';')[0];

            const binaryString = window.atob(base64Url);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i += 1) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([bytes], { type: mimeType });

            setBlob(blob);
        }
    }, [setBlob, file, scale, rotate]);

    return (
        <HStack maxW className={classNames(classes.ImagePreview, {}, [className])}>
            <input
                className={classes.FileInput}
                accept={'image/*'}
                onChange={handleChange}
                type="file"
                name="file"
                id="file"
            />
            {file ? (
                <>
                    <AvatarEditor
                        ref={editorRef}
                        image={file || ''}
                        width={250}
                        height={250}
                        border={2}
                        color={[255, 255, 255, 0.6]}
                        scale={scale}
                        rotate={rotate}
                    />
                    <Knob
                        min={1}
                        max={5}
                        step={0.2}
                        valueTemplate={`x${scale.toFixed(1)}`}
                        value={scale}
                        valueColor="#708090"
                        rangeColor="#48d1cc"
                        onChange={(e) => setScale(e.value)}
                    />

                    <Knob
                        min={-180}
                        max={180}
                        step={10}
                        valueTemplate={`${rotate}°`}
                        value={rotate}
                        valueColor="#708090"
                        rangeColor="#48d1cc"
                        onChange={(e) => setRotate(e.value)}
                    />
                </>
            ) : (
                <label htmlFor="file" className={classes.fileInputLabel}>
                    <span>Выберите картинку</span>
                </label>
            )}
        </HStack>
    );
});
