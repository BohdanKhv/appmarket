import { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Compressor from 'compressorjs';


const UploadImage = ({ onImageUpdate, folder, fileName, inputRef }) => {
    const [imgCompressor, setImgCompressor] = useState(null);

    const uploadImageToFirebase = (file, folder, fileName) => {
        const storageRef = ref(storage, `${folder}/${fileName}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log(newProgress);
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onImageUpdate(downloadURL);
                });
            }
        );
    }

    const format = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const calculate = (t) => {
        return (
          Math.round((performance.now() - t + Number.EPSILON) * 100) / 100 + 'ms'
        );
    };

    useEffect(() => {
        if (imgCompressor) {
            const t0 = performance.now();
            new Compressor(imgCompressor, {
                quality: 0.6,
                maxWidth: 800,
                convertSize: 1000000, // 1MB
                success(blob) {
                    console.log('compressorjs', format(blob.size), calculate(t0));
                    uploadImageToFirebase(blob, folder, fileName);
                },
            });
        }
    }, [imgCompressor]);

    return (
        <input
            type="file"
            accept="image/*"
            className="upload-image-input"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={(e) => {
                if ((e.target.files[0] && e.target.files[0].type === 'image/png') || (e.target.files[0] && e.target.files[0].type === 'image/jpeg') || (e.target.files[0] && e.target.files[0].type === 'image/webp')) {
                    setImgCompressor(e.target.files[0]);
                }
            }}
        />
    )
}

export default UploadImage