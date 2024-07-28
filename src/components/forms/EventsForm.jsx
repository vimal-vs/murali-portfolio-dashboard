import React, { useState } from 'react';
import Input from '../reusable/Input';
import DateInput from '../reusable/DateInput';
import Button from '../reusable/Button';
import Upload from '../reusable/Upload';

const EventForm = ({ event, onSubmit, buttonText }) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [date, setDate] = useState(event?.date || "");
    const [imageUrls, setImageUrls] = useState(event?.imageUrls || []);

    const [titleValidation, setTitleValidation] = useState("");
    const [descriptionValidation, setDescriptionValidation] = useState("");
    const [dateValidation, setDateValidation] = useState("");

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
        if (isValid) {
            onSubmit({ title, description, date, imageUrls });
        }
    };

    return (
        <div className="w-full flex flex-col my-4">
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
                <DateInput
                    label={"Date"}
                    placeholder={"Enter event date"}
                    value={date}
                    error={dateValidation !== "" ? dateValidation : ""}
                    setValue={setDate}
                    mandate={true}
                />
            </div>
            <Upload
                label={"Image"}
                mandate={true}
                isMultiple={true}
                filesUrl={imageUrls}
                setFilesUrl={setImageUrls}
            />
            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} disabled={imageUrls?.length === 0} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default EventForm;