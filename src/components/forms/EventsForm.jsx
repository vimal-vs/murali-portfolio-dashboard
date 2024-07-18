import React, { useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';

const EventForm = ({ event, onSubmit, buttonText }) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [date, setDate] = useState(event?.date || "");
    const [imageUrls, setImageUrls] = useState(event?.imageUrls || []);

    const [titleValidation, setTitleValidation] = useState("");
    const [descriptionValidation, setDescriptionValidation] = useState("");
    const [dateValidation, setDateValidation] = useState("");
    const [imageUrlsValidation, setImageUrlsValidation] = useState("");

    const validateFields = () => {
        let isValid = true;
        if (title === "") {
            setTitleValidation("Please enter event title");
            isValid = false;
        } else {
            setTitleValidation("");
        }
        if (description === "") {
            setDescriptionValidation("Please enter event description");
            isValid = false;
        } else {
            setDescriptionValidation("");
        }
        if (date === "") {
            setDateValidation("Please enter event date");
            isValid = false;
        } else {
            setDateValidation("");
        }
        if (imageUrls.length === 0) {
            setImageUrlsValidation("Please enter at least one image URL");
            isValid = false;
        } else {
            setImageUrlsValidation("");
        }
        if (isValid) {
            onSubmit({ title, description, date, imageUrls });
        }
    };

    return (
        <div className="w-full flex flex-wrap gap-6 my-4">
            <Input
                label={"Title"}
                placeholder={"Enter event title"}
                value={title}
                error={titleValidation !== "" ? titleValidation : ""}
                onChange={(e) => setTitle(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Description"}
                placeholder={"Enter event description"}
                value={description}
                error={descriptionValidation !== "" ? descriptionValidation : ""}
                onChange={(e) => setDescription(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Date"}
                placeholder={"Enter event date"}
                value={date}
                error={dateValidation !== "" ? dateValidation : ""}
                onChange={(e) => setDate(e.target.value)}
                mandate={true}
            />
            <Input
                label={"Image URLs"}
                placeholder={"Enter event image URLs (comma separated)"}
                value={imageUrls.join(",")}
                error={imageUrlsValidation !== "" ? imageUrlsValidation : ""}
                onChange={(e) => setImageUrls(e.target.value.split(","))}
                mandate={true}
            />
            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default EventForm;