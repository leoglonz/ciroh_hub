import React from "react";
import "./teamMembers.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const investigators = [
  {
    name: "Steven Burian",
    role: "Community Water Model Infrastructure, Stewardship, and Integration",
    image: "/img/profiles/Steven_Burian.jpg",
    initial: "SB", 
    link: "https://eng.ua.edu/eng-directory/dr-steven-burian/",
    orgName: "The University of Alabama",
    orgLogo: "/img/logos/uni/UAlogo.png",
  }, 
  {
    name: "Purushotham Bangalore",
    role: "Community Accessible Development: Nextgen Water Resources Modeling Framework in the CIROH Research to Operations Hybrid Cloud",
    image: "/img/profiles/Purushotham_Bangalore.jpg",
    initial: "PB",
    link: "https://eng.ua.edu/eng-directory/dr-purushotham-bangalore/",
    orgName: "The University of Alabama",
    orgLogo: "/img/logos/uni/UAlogo.png",
  },
  {
    name: "Arpita Patel",
    role: "Advancing Community NextGen and NextGen In A Box (NGIAB) - Paving the Pathway to Operations",
    image: "/img/profiles/Arpita_Patel.png",
    initial: "AP",
    link: "https://awi.ua.edu/directory/arpita-patel/",
    orgName: "The University of Alabama",
    orgLogo: "/img/logos/uni/UAlogo.png",
  },
  {
    name: "Dan Ames",
    role: "Turning Research into Actionable Information for Operational Impact by Advancing NOAA's National Cyberinfrastructure, CIROH Portal, and Web and Mobile Apps",
    image: "/img/profiles/Dan_Ames.jpg",
    initial: "DA",
    link: "https://cce.byu.edu/directory/dan-ames",
    orgName: "Brigham Young University",
    orgLogo: "/img/logos/uni/byu.png",
  },
  {
    name: "Jeffrey C. Carver",
    role: "Associate Department Head for Graduate Studies\nDepartment of Computer Science",
    image: "/img/profiles/Jeff_Carver.jpg",
    initial: "JC",
    link: "https://carver.cs.ua.edu/",
    orgName: "University of Alabama",
    orgLogo: "/img/logos/uni/UAlogo.png",
  },
];

export default function PrincipalInvestigators() {
  return (
    <section className="team-section">
      <h2 className="team-title tw-mt-8">Principal Investigators</h2>
      <div className="team-divider"></div>

      <div className="team-grid-list">
        {investigators.map((person) => (
          <div
            className="tw-bg-slate-100 tw-text-black dark:tw-bg-slate-900 dark:tw-text-blue-800 profile-card"
            key={person.name}
          >
            <div className="profile-img-wrapper">
              {person.image ? (
                <img
                  src={useBaseUrl(person.image)}
                  alt={person.name}
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder">{person.initial}</div>
              )}
            </div>

            <div className="card-content">
              <h3 className="tw-text-blue-900 dark:tw-text-cyan-400 profile-name">
                {person.name}
              </h3>

              <p className="tw-text-blue-700 dark:tw-text-white profile-role">
                {person.role}
              </p>

              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-inline-flex tw-items-center tw-justify-center tw-mt-3"
                aria-label={person.orgName || person.role}
                title={person.orgName || person.role}
              >
                <img
                  src={useBaseUrl(person.orgLogo || "/img/logos/uni/UAlogo.png")}
                  alt={person.orgName || person.role}
                  className="tw-w-8 tw-h-8"
                  onError={(e) => {
                    // Avoid a broken-image icon if BYU logo asset isn't present yet.
                    e.currentTarget.src = useBaseUrl("/img/logos/uni/UAlogo.png");
                  }}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
