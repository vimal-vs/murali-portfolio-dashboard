import React, { useEffect, useState } from 'react';
import Input from '../reusable/Input';
import Button from '../reusable/Button';

const CommonForm = ({ common, onSubmit, buttonText, setIsModalOpen }) => {
    const [statistics, setStatistics] = useState(common?.statistics || {});
    const [footer, setFooter] = useState(common?.footer || {});
    const [landing, setLanding] = useState({
        ...common?.landing,
        header: common?.landing?.header?.join(', ') || '',
    });
    const [links, setLinks] = useState(common?.links || {});

    useEffect(() => {
        if (common) {
            setStatistics(common.statistics || {});
            setFooter(common.footer || {});
            setLanding({
                ...common.landing,
                header: common.landing?.header?.join(', ') || '',
            });
            setLinks(common.links || {});
        }
    }, [common]);

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleLandingHeaderChange = (e) => {
        const { value } = e.target;
        setLanding((prev) => ({ ...prev, header: value }));
    };

    const handleSubmit = () => {
        const formattedLanding = {
            ...landing,
            header: landing.header.split(',').map(item => item.trim()),
        };
        onSubmit({ statistics, footer, landing: formattedLanding, links }, setIsModalOpen);
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
                    label={"Email"}
                    placeholder={"Enter Email"}
                    value={footer.email || ""}
                    name="email"
                    onChange={handleInputChange(setFooter)}
                />
                <Input
                    label={"Contact Number"}
                    placeholder={"Enter contact number"}
                    value={footer.contactNumber || ""}
                    name="contactNumber"
                    onChange={handleInputChange(setFooter)}
                />
            </div>

            {/* Landing Section */}
            <h2 className='font-semibold'>Landing</h2>
            <div className="w-full grid grid-cols-3 gap-3">
                <Input
                    label={"Header"}
                    placeholder={"Enter header text"}
                    value={landing.header || ""}
                    name="header"
                    onChange={handleLandingHeaderChange}
                />
                <Input
                    label={"Sub Header"}
                    placeholder={"Enter sub Header text"}
                    value={landing.subHeader || ""}
                    name="subHeader"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Short Text"}
                    placeholder={"Enter short text"}
                    value={landing.shortText || ""}
                    name="shortText"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 1"}
                    placeholder={"Enter Stat 1"}
                    value={landing.stat1 || ""}
                    name="stat1"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 2"}
                    placeholder={"Enter Stat 2"}
                    value={landing.stat2 || ""}
                    name="stat2"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 3"}
                    placeholder={"Enter Stat 3"}
                    value={landing.stat3 || ""}
                    name="stat3"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 1 Content"}
                    placeholder={"Enter Stat 1 Content"}
                    value={landing.stat1content || ""}
                    name="stat1content"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 2 Content"}
                    placeholder={"Enter Stat 2 Content"}
                    value={landing.stat2content || ""}
                    name="stat2content"
                    onChange={handleInputChange(setLanding)}
                />
                <Input
                    label={"Stat 3 Content"}
                    placeholder={"Enter Stat 3 Content"}
                    value={landing.stat3content || ""}
                    name="stat3content"
                    onChange={handleInputChange(setLanding)}
                />
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
                <Input
                    label={"LinkedIn"}
                    placeholder={"Enter LinkedIn URL"}
                    value={links.linkedin || ""}
                    name="linkedin"
                    onChange={handleInputChange(setLinks)}
                />
                <Input
                    label={"Instagram"}
                    placeholder={"Enter Instagram URL"}
                    value={links.instagram || ""}
                    name="instagram"
                    onChange={handleInputChange(setLinks)}
                />
                <Input
                    label={"YouTube"}
                    placeholder={"Enter YouTube URL"}
                    value={links.youtube || ""}
                    name="youtube"
                    onChange={handleInputChange(setLinks)}
                />
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <Button text={buttonText} onClick={handleSubmit} width={"100px"} />
            </div>
        </div>
    );
};

export default CommonForm;
