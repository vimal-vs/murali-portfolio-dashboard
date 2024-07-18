import { useRef, useState } from "react";
import Mandate from "./Mandate";
import axios from "axios";
import { message } from "antd";

export default function Upload({
    width,
    label,
    mandate,
    inputValue,
    setInputValue,
    selectedFile,
    setSelectedFile,
    isError,
    disabled,
    errorMessage,
    setAadharCardFileUrls,
    setDrivingLicenseFileUrls,
    setPollutionCertificateFileUrls,
    setCovidVaccineCertificateFileUrls,
    setPoliceCertificateFileUrls,
    setFcCopyFileUrls,
    setRcCopyFileUrls,
    updateComponent,
    setDrivingLicenseFrontFileUrls,
    setDrivingLicenseBackFileUrls,
    setRcCopyFrontFileUrls,
    setRcCopyBackFileUrls,
    setAadharCardFrontFileUrls,
    setAadharCardBackFileUrls,
    setInsuranceFileUrl,
    setPermitAndTaxFileUrl,
}) {

    const [previewModal, setPreviewModal] = useState(false);
    const fileRef = useRef();

    const handleViewFile = (e) => {
        if (selectedFile) {
            setPreviewModal(true);
        } e.stopPropagation();
    };

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleClearFile = () => {
        setInputValue("");
        setSelectedFile(null);
    };

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setInputValue(event.target.files[0].name);
        }
    };

    const inputStyle = {
        width: width || "100%",
    };

    const uploadFiles = async (e, setFileUrls) => {

        const formData = new FormData();
        const files = e.target.files;
        formData.append("images", files[0]);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/driver/uploadDocument`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": localStorage.getItem("CC_ADMIN_TOKEN"),
                        "email": localStorage.getItem("CC_ADMIN_EMAIL"),
                        "usertype": localStorage.getItem("CC_ADMIN_USERTYPE")
                    },
                }
            );

            if (response.data.status && response.data.data) {
                setFileUrls(response.data.data[0]);
            }
        } catch (error) {
            if (error.response && error.response.status === 401 || error.response.status === 403) {
                localStorage.clear();
                window.location.href = "/login";
            } else {
                console.error("Error:", error);
            }
            return error.response && error.response.data;
        }
    };

    const handleAadharCardUpload = (e) => {

        uploadFiles(e, setAadharCardFileUrls);

    };

    const handleDrivingLicenseUpload = (e) => {
        uploadFiles(e, setDrivingLicenseFileUrls);
    };

    const handlePollutionCertificateUpload = (e) => {
        uploadFiles(e, setPollutionCertificateFileUrls);
    };

    const handleCovidVaccineCertificateUpload = (e) => {
        uploadFiles(e, setCovidVaccineCertificateFileUrls);
    };

    const handlePoliceCertificateUpload = (e) => {
        uploadFiles(e, setPoliceCertificateFileUrls);
    };

    const handleFcCopyUpload = (e) => {
        uploadFiles(e, setFcCopyFileUrls);
    };
    const handleRcCopyUpload = (e) => {
        uploadFiles(e, setRcCopyFileUrls);
    };


    return (
        <div className={`flex flex-col min-w-[200px] w-full`}
            style={{
                width: inputStyle.width
            }}>
            <div className="h-fit">
                <label
                    className="text-[#344054] text-[15px] pl-1 font-medium"
                    htmlFor={label}
                    style={{ fontSize: '12px' }}
                >
                    {label}<Mandate mandate={mandate} />
                </label>
            </div>
            <div
                className={`flex justify-between items-center p-2 h-[40px] text-left text-[#98A2B3] text-sm rounded-md border ${selectedFile !== null && "bg-grayLightbg"
                    }  border-border-gray  
                    ${isError
                        ? "border-[#FF0000] border text-[#FF0000] placeholder:[#FF0000]"
                        : "border-border-gray"
                    }
                        ${disabled && "bg-[#eee] text-[#000] cursor-not-allowed"
                    }
                   
                        `}
                style={{
                    width: inputStyle.width
                }}
            >
                <div className="flex items-center w-full">
                    <div className="flex items-center w-full">
                        <input
                            id={`charCount`}
                            type="text"
                            placeholder={`Upload document`}
                            className={`border-none outline-none placeholder:text-placeholder-gray  disabled:bg-transparent 
                            ${selectedFile !== null
                                    ? "text-[#175CD3] h-[30px]"
                                    : "text-black"
                                }
                                   
                                
                                `}
                            style={{
                                width: inputStyle.width - 30,
                                fontSize: '12px'
                            }}
                            value={inputValue}
                            onChange={(event) => handleInput(event)}
                            disabled
                        />

                        {selectedFile && (
                            <div className="flex items-center gap-3  md:pl-16">
                                <button type="button" onClick={(e) => { handleViewFile(e) }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </button>

                            </div>
                        )}
                    </div>

                </div>
                <label htmlFor={`fileInput}`} className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => fileRef.current.click()}>
                    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                        <rect width="32" height="31" fill="url(#pattern0)" />
                        <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use href="#image0_557_13728" transform="matrix(0.01 0 0 0.0103226 0 -0.016129)" />
                            </pattern>
                            <image id="image0_557_13728" width="100" height="100" href="data:image/png;base64,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" />
                        </defs>
                    </svg>
                </label>
                <input
                    type="file"
                    disabled={disabled}
                    id={`fileInput`}
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                        handleFileChange(event)
                        if (setAadharCardFileUrls) {

                            handleAadharCardUpload(event)
                        }
                        if (setDrivingLicenseFileUrls) {
                            handleDrivingLicenseUpload(event)
                        }
                        if (setPollutionCertificateFileUrls) {
                            handlePollutionCertificateUpload(event)
                        }
                        if (setCovidVaccineCertificateFileUrls) {
                            handleCovidVaccineCertificateUpload(event)
                        }
                        if (setPoliceCertificateFileUrls) {
                            handlePoliceCertificateUpload(event)
                        }
                        if (setFcCopyFileUrls) {
                            handleFcCopyUpload(event)
                        }
                        if (setRcCopyFileUrls) {
                            handleRcCopyUpload(event)
                        }
                        if (setDrivingLicenseFrontFileUrls) {
                            uploadFiles(event, setDrivingLicenseFrontFileUrls)
                        }
                        if (setDrivingLicenseBackFileUrls) {
                            uploadFiles(event, setDrivingLicenseBackFileUrls)
                        }
                        if (setRcCopyFrontFileUrls) {
                            uploadFiles(event, setRcCopyFrontFileUrls)
                        }
                        if (setRcCopyBackFileUrls) {
                            uploadFiles(event, setRcCopyBackFileUrls)
                        }
                        if (setAadharCardFrontFileUrls) {
                            uploadFiles(event, setAadharCardFrontFileUrls)
                        }
                        if (setAadharCardBackFileUrls) {
                            uploadFiles(event, setAadharCardBackFileUrls)
                        }
                        if (setInsuranceFileUrl) {
                            uploadFiles(event, setInsuranceFileUrl)
                        }
                        if (setPermitAndTaxFileUrl) {
                            uploadFiles(event, setPermitAndTaxFileUrl)
                        }


                    }}
                    style={{ fontSize: '12px' }}
                    ref={fileRef}
                />
            </div>
            {
                isError && (
                    <div className="flex items-center gap-1 text-[#FF0000]">

                        <span style={{ fontSize: '12px' }}>{errorMessage}</span>
                    </div>
                )
            }
            {previewModal &&
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-black/40">
                    <div className="flex justify-center items-center w-full h-[90%]">
                        <div className="flex justify-start items-start">
                            <button type="button" onClick={(e) => { setPreviewModal(false); e.stopPropagation() }} className="p-3 absolute right-0 top-0 m-6 bg-white rounded-full">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.536877 0.479133C1.08606 -0.0920026 1.97644 -0.0920026 2.52561 0.479133L13.7756 12.1792C14.3247 12.7503 14.3247 13.6762 13.7756 14.2474C13.2264 14.8185 12.3359 14.8185 11.7867 14.2474L0.536877 2.54742C-0.0122922 1.97626 -0.0122922 1.05027 0.536877 0.479133Z" fill="#1849A9" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7756 0.479133C14.3247 1.05029 14.3247 1.97628 13.7756 2.54742L2.52561 14.2474C1.97643 14.8185 1.08605 14.8185 0.536877 14.2474C-0.0122922 13.6762 -0.0122922 12.7501 0.536877 12.179L11.7869 0.479133C12.3361 -0.0920026 13.2264 -0.0920026 13.7756 0.479133Z" fill="#1849A9" />
                                </svg>
                            </button>
                        </div>
                        {
                            updateComponent ? (
                                <img src={typeof (selectedFile) === "string" ? selectedFile?.includes("https") ? selectedFile : URL.createObjectURL(selectedFile) : URL.createObjectURL(selectedFile)} alt="Preview" className="h-full w-full object-contain" />
                            )
                                :

                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-full w-full object-contain" />
                        }

                    </div>
                </div>
            }
        </div>
    );
};
