import React, { useEffect, useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';

const CommonForm = ({ common, onSubmit, buttonText, setIsModalOpen }) => {
    const [statistics, setStatistics] = useState(common?.statistics || {});
    const [footer, setFooter] = useState(common?.footer || {});
    const [landing, setLanding] = useState(common?.landing || {});
    const [links, setLinks] = useState(common?.links || {});

    useEffect(() => {
        if (common) {
            setStatistics(common.statistics || {});
            setFooter(common.footer || {});
            setLanding(common.landing || {});
            setLinks(common.links || {});
        }
    }, [common]);

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit({ statistics, footer, landing, links }, setIsModalOpen);
    };

    return (
        <div className="w-full flex flex-col gap-2 my-4">
            {/* Statistics Section */}
            <h2 className='font-semibold'>Statistics</h2>
            <div className="w-full grid grid-cols-3 gap-3">
                <Input
                    label={"Visits"}
                    placeholder={"Enter number of visits"}
                    value={statistics.visits || ""}
                    name="visits"
                    onChange={handleInputChange(setStatistics)}
                />
                <Input
                    label={"Downloads"}
                    placeholder={"Enter number of downloads"}
                    value={statistics.downloads || ""}
                    name="downloads"
                    onChange={handleInputChange(setStatistics)}
                />
                {/* Add more inputs as needed */}
            </div>

            {/* Footer Section */}
            <h2 className='font-semibold'>Footer</h2>
            <div className="w-full grid grid-cols-3 gap-3">
                <Input
                    label={"Address"}
                    placeholder={"Enter address"}
                    value={footer.address || ""}
                    name="address"
                    onChange={handleInputChange(setFooter)}
                />
                <Input
                    label={"Contact Number"}
                    placeholder={"Enter contact number"}
                    value={footer.contactNumber || ""}
                    name="contactNumber"
                    onChange={handleInputChange(setFooter)}
                />
                {/* Add more inputs as needed */}
            </div>

            {/* Landing Section */}
            <h2 className='font-semibold'>Landing</h2>
            <div className="w-full grid grid-cols-3 gap-3">
                <Input
                    label={"Header"}
                    placeholder={"Enter header text"}
                    value={landing.header || ""}
                    name="header"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Subheader"}
                    placeholder={"Enter subheader text"}
                    value={landing.subheader || ""}
                    name="subheader"
                    onChange={handleInputChange(setLanding)}
                />
                {/* Add more inputs as needed */}
            </div>

            {/* Links Section */}
            <h2 className='font-semibold'>Links</h2>
            <div className="w-full grid grid-cols-3 gap-3">
                <Input
                    label={"Facebook"}
                    placeholder={"Enter Facebook URL"}
                    value={links.facebook || ""}
                    name="facebook"
                    onChange={handleInputChange(setLinks)}
                />
                <Input
                    label={"Twitter"}
                    placeholder={"Enter Twitter URL"}
                    value={links.twitter || ""}
                    name="twitter"
                    onChange={handleInputChange(setLinks)}
                />
                {/* Add more inputs as needed */}
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={handleSubmit} width={"100px"} />
            </div>
        </div>
    );
};

export default CommonForm;