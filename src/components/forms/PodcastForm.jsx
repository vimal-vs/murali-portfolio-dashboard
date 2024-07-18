import React, { useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';

const PodcastForm = ({ podcast, onSubmit, buttonText }) => {
    const [title, setTitle] = useState(podcast?.title || "");
    const [description, setDescription] = useState(podcast?.description || "");
    const [url, setUrl] = useState(podcast?.url || "");

    const [titleValidation, setTitleValidation] = useState("");
    const [descriptionValidation, setDescriptionValidation] = useState("");
    const [urlValidation, setUrlValidation] = useState("");

    const validateFields = () => {
        let isValid = true;
        if (title === "") {
            setTitleValidation("Please enter podcast title");
            isValid = false;
        } else {
            setTitleValidation("");
        }
        if (description === "") {
            setDescriptionValidation("Please enter podcast description");
            isValid = false;
        } else {
            setDescriptionValidation("");
        }
        if (url === "") {
            setUrlValidation("Please enter podcast URL");
            isValid = false;
        } else {
            setUrlValidation("");
        }
        if (isValid) {
            onSubmit({ title, description, url });
        }
    };

    return (
        <div className="w-full flex flex-wrap gap-6 my-4">
            <Input
                label={"Title"}
                placeholder={"Enter podcast title"}
                value={title}
                error={titleValidation !== "" ? titleValidation : ""}
                onChange={(e) => setTitle(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Description"}
                placeholder={"Enter podcast description"}
                value={description}
                error={descriptionValidation !== "" ? descriptionValidation : ""}
                onChange={(e) => setDescription(e.target.value)}
                mandate={true}
            />
            <Input
                label={"URL"}
                placeholder={"Enter podcast URL"}
                value={url}
                error={urlValidation !== "" ? urlValidation : ""}
                onChange={(e) => setUrl(e.target.value)}
                mandate={true}
            />
            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default PodcastForm;