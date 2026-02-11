import TeamGalleryGenerator from "./TeamGalleryGenerator";
import LeadList from "./LeadList";
import MemberList from "./MemberList";

export default function TeamGallery() {
    return (
        <>
            <TeamGalleryGenerator team={LeadList} text="CIROH Hub Leads" />
            <TeamGalleryGenerator team={MemberList} text="CIROH Hub Team" />
        </>
    );
}