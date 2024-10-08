import { useEffect, useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';
import TextArea from '../reusable/TextArea';

const TestimonialForm = ({ testimonial, onSubmit, buttonText }) => {
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");

    const [contentValidation, setContentValidation] = useState("");
    const [nameValidation, setNameValidation] = useState("");
    const [designationValidation, setDesignationValidation] = useState("");

    useEffect(() => {
        setContent(testimonial?.content || "");
        setName(testimonial?.name || "");
        setDesignation(testimonial?.designation || "");
    }, [testimonial]);

    const validateFields = () => {
        let isValid = true;
        if (content === "") {
            setContentValidation("Please enter testimonial content");
            isValid = false;
        } else {
            setContentValidation("");
        }
        if (name === "") {
            setNameValidation("Please enter testimonial name");
            isValid = false;
        } else {
            setNameValidation("");
        }
        if (designation === "") {
            setDesignationValidation("Please enter testimonial designation");
            isValid = false;
        } else {
            setDesignationValidation("");
        }
        if (isValid) {
            onSubmit({ content, name, designation });
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 my-4">
            <TextArea
                label={"Content"}
                placeholder={"Enter testimonial content"}
                value={content}
                error={contentValidation !== "" ? contentValidation : ""}
                onChange={(e) => setContent(e.target.value)}
                mandate={true}
                charLimit={300}
                width={"100%"}
            />
            <div className='flex flex-wrap justify-between'>
                <Input
                    label={"Name"}
                    placeholder={"Enter testimonial name"}
                    value={name}
                    error={nameValidation !== "" ? nameValidation : ""}
                    onChange={(e) => setName(e.target.value)}
                    mandate={true}
                />
                <Input
                    label={"Designation"}
                    placeholder={"Enter testimonial designation"}
                    value={designation}
                    error={designationValidation !== "" ? designationValidation : ""}
                    onChange={(e) => setDesignation(e.target.value)}
                    mandate={true}
                />
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={validateFields} width={"100px"} />
            </div>
        </div>
    );
};

export default TestimonialForm;