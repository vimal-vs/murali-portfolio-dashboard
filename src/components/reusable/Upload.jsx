import { useState, useEffect } from 'react';
import { Delete, Visibility } from '@mui/icons-material';
import ImageService from "../../services/Image";
import { Button, message } from 'antd';
import Mandate from './Mandate';

const STATUS_IDLE = 0;
const STATUS_UPLOADING = 1;

const Upload = ({ label, mandate, isMultiple, filesUrl, setFilesUrl }) => {
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState(STATUS_IDLE);

    useEffect(() => {
        if (filesUrl && isMultiple) {
            setFiles(filesUrl.map((url, index) => ({ url, name: `File ${index + 1}`, type: 'image/*' })));
        } else if (filesUrl) {
            setFiles([{ url: filesUrl, name: 'File 1', type: 'image/*' }]);
        }
    }, [filesUrl, isMultiple]);

    const uploadImages = async (data) => {
        setStatus(STATUS_UPLOADING);
        const response = await ImageService.uploadFiles(data);
        if (response.status === 200) {
            message.success("Files uploaded");
            if (isMultiple) {
                setFilesUrl([...filesUrl, ...response.data?.files]);
            } else {
                setFilesUrl(response.data?.files[0]);
            }
            setStatus(STATUS_IDLE);
        }
    };

    const packFiles = (files) => {
        const data = new FormData();
        files.forEach((file) => {
            if (!file.url) {
                data.append(`files`, file, file.name);
            }
        });
        return data;
    };

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files);
            uploadImages(data);
        }
    };

    const handleFileChange = (e) => {
        if (isMultiple) {
            setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
        } else {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleFileDelete = (index) => {
        setFiles((prevFiles) => {
            const newFiles = Array.from(prevFiles);
            newFiles.splice(index, 1);
            return newFiles;
        });

        if (isMultiple) {
            setFilesUrl((prevFilesUrl) => {
                const newFilesUrl = Array.from(prevFilesUrl);
                newFilesUrl.splice(index, 1);
                return newFilesUrl;
            });
        } else {
            setFilesUrl('');
        }
    };

    const renderFileList = () => (
        <ol className="file-list">
            {files.map((file, index) => (
                <li key={index} className="file-item">
                    <div className="file-info">
                        <div className='flex'>
                            <p className='truncate max-w-[120px]'>{file.name || `File ${index + 1}`}</p> - {file.type}
                        </div>
                        <div className="file-actions">
                            <Delete
                                className="file-action-icon delete-icon"
                                onClick={() => handleFileDelete(index)}
                            />
                            <Visibility
                                className="file-action-icon preview-icon"
                                onClick={() => window.open(file.url || URL.createObjectURL(file), '_blank')}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );

    const getButtonStatusText = () => (
        status === STATUS_IDLE ? 'Upload' : <img src="./load.svg" alt="loading" />
    );

    return (
        <div className="flex flex-col gap-3 w-fit">
            <div className="text-[#344054] text-[12px] pl-1 font-medium">
                {label}<Mandate mandate={mandate} />
            </div>
            <div className='flex flex-col'>
                <input
                    type="file"
                    accept="image/*"
                    multiple={isMultiple}
                    onChange={handleFileChange}
                    className="file-input p-1 border rounded"
                />
                {files.length > 0 && renderFileList()}
            </div>
            <Button
                onClick={handleUploadClick}
                disabled={status === STATUS_UPLOADING}
            >
                {getButtonStatusText()}
            </Button>
        </div>
    );
};

export default Upload;
