import React, { useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';
import DateInput from '../reusable/DateInput';
import Upload from '../reusable/Upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({ blog, onSubmit, buttonText }) => {
    const [title, setTitle] = useState(blog?.title || "");
    const [content, setContent] = useState(blog?.content || "");
    const [date, setDate] = useState(blog?.date || "");
    const [imageUrl, setImageUrl] = useState(blog?.imageUrl || "");

    const [titleValidation, setTitleValidation] = useState("");
    const [contentValidation, setContentValidation] = useState("");
    const [dateValidation, setDateValidation] = useState("");

    const validateFields = () => {
        let isValid = true;
        if (title === "") {
            setTitleValidation("Please enter blog title");
            isValid = false;
        } else {
            setTitleValidation("");
        }
        if (content === "") {
            setContentValidation("Please enter blog content");
            isValid = false;
        } else {
            setContentValidation("");
        }
        if (date === "") {
            setDateValidation("Please enter blog date");
            isValid = false;
        } else {
            setDateValidation("");
        }
        if (isValid) {
            onSubmit({ title, content, date, imageUrl });
        }
    };

    return (
        <div className="flex flex-col gap-2 my-4">
            <div className="flex flex-wrap gap-6 my-4">
                <Input
                    label={"Title"}
                    placeholder={"Enter blog title"}
                    value={title}
                    error={titleValidation !== "" ? titleValidation : ""}
                    onChange={(e) => setTitle(e.target.value)}
                    mandate={true}
                />
                <DateInput
                    label={"Date"}
                    placeholder={"Enter blog date"}
                    value={date}
                    setValue={setDate}
                    error={dateValidation !== "" ? dateValidation : ""}
                    mandate={true}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="text-[#344054] text-[12px] pl-1 font-medium">Content <span className="text-red-500">*</span></label>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="my-2"
                    theme="snow"
                />
                {contentValidation && <div className="text-red-500 text-xs">{contentValidation}</div>}
            </div>
            <Upload
                label={"Image"}
                mandate={true}
                isMultiple={false}
                filesUrl={imageUrl}
                setFilesUrl={setImageUrl}
            />
            <div className="w-full flex justify-center items-center mt-12">
                <Button text={buttonText} disabled={imageUrl?.length === 0} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default BlogForm;