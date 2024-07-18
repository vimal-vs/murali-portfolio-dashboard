export default function Mandate({ mandate = false }) {
    return (
        <>
            {mandate && <span className="text-[#D92D20]">*</span>}
        </>
    )
}
