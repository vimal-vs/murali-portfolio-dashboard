import React, { useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';
import DateInput from '../reusable/DateInput';

const BlogForm = ({ blog, onSubmit, buttonText }) => {
    const [title, setTitle] = useState(blog?.title || "");
    const [content, setContent] = useState(blog?.content || "");
    const [date, setDate] = useState(blog?.date || "");
    const [link, setLink] = useState(blog?.link || "");
    const [imageUrl, setImageUrl] = useState(blog?.imageUrl || "");

    const [titleValidation, setTitleValidation] = useState("");
    const [contentValidation, setContentValidation] = useState("");
    const [dateValidation, setDateValidation] = useState("");
    const [linkValidation, setLinkValidation] = useState("");
    const [imageUrlValidation, setImageUrlValidation] = useState("");

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
        if (link === "") {
            setLinkValidation("Please enter blog link");
            isValid = false;
        } else {
            setLinkValidation("");
        }
        if (imageUrl === "") {
            setImageUrlValidation("Please enter blog image URL");
            isValid = false;
        } else {
            setImageUrlValidation("");
        }
        if (isValid) {
            onSubmit({ title, content, date, link, imageUrl });
        }
    };

    return (
        <div className="w-full flex flex-wrap gap-6 my-4">
            <Input
                label={"Title"}
                placeholder={"Enter blog title"}
                value={title}
                error={titleValidation !== "" ? titleValidation : ""}
                onChange={(e) => setTitle(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Content"}
                placeholder={"Enter blog content"}
                value={content}
                error={contentValidation !== "" ? contentValidation : ""}
                onChange={(e) => setContent(e.target.value)}
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
            <Input
                label={"Link"}
                placeholder={"Enter blog link"}
                value={link}
                error={linkValidation !== "" ? linkValidation : ""}
                onChange={(e) => setLink(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Image URL"}
                placeholder={"Enter blog image URL"}
                value={imageUrl}
                error={imageUrlValidation !== "" ? imageUrlValidation : ""}
                onChange={(e) => setImageUrl(e.target.value)}
                mandate={true}
            />
            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default BlogForm;