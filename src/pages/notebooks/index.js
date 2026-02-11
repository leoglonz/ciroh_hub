import React, { useCallback, useMemo, useState } from "react";
import Header from "@site/src/components/Header";
import HydroShareResourcesSelector from "@site/src/components/HydroShareResourcesSelector";
import { ConstellationCanvas } from '@site/src/components/ConstellationCanvas';
import Layout from '@theme/Layout';
import TechBox from "@site/src/components/TechBox";
import HydroShareLogo from '@site/static/img/logos/hydroshare-white.png';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import StatsBar from "@site/src/components/StatsBar";

const items = [
  {
    lightIcon: HydroShareLogo,
    darkIcon: HydroShareLogo,
    alt: 'HydroShare',
    name: 'HydroShare',
    href: 'https://hydroshare.org/',
  },
];

export default function NoteBooksPage() {
  const contributeUrl = useBaseUrl('/contribute?current-contribution=apps');
  const docsUrl = useBaseUrl('/docs/products/intro');
  const defaultImage = 'https://ciroh-portal-static-data.s3.us-east-1.amazonaws.com/app_placeholder.png'

  return (
    <Layout title="Apps" description="CIROH NoteBooks">
      <NoteBooksPageContent
        contributeUrl={contributeUrl}
        docsUrl={docsUrl}
        defaultImage={defaultImage}
      />
    </Layout>
  );
}

function NoteBooksPageContent({ contributeUrl, docsUrl, defaultImage }) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const [apps, setApps] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const onResultsChange = useCallback((results, meta) => {
    setApps(results);
    setStatsLoading(Boolean(meta?.loading));
  }, []);

  const stats = useMemo(() => {
    const totalApps = apps.length;

    const categories = new Set(
      apps.map(a => a?.resource_type).filter(Boolean)
    ).size;

    const contributors = (() => {
      const set = new Set();
      for (const app of apps) {
        const authors = typeof app?.authors === 'string' ? app.authors : '';
        authors
          .split('🖊')
          .map(a => a.trim())
          .filter(Boolean)
          .forEach(a => set.add(a));
      }
      return set.size;
    })();

    const lastUpdated = (() => {
      let latest = null;
      for (const app of apps) {
        const d = app?.date_last_updated ? new Date(app.date_last_updated) : null;
        if (!d || Number.isNaN(d.getTime())) continue;
        if (!latest || d > latest) latest = d;
      }
      if (!latest) return '-';
      try {
        return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(latest);
      } catch {
        return latest.toISOString().slice(0, 10);
      }
    })();

    return { totalApps, categories, contributors, lastUpdated };
  }, [apps]);

  return (
    <>
      {/* Hero */}
      <section className="tw-relative tw-z-20 tw-overflow-hidden tw-pb-8">
        <div className="tw-absolute tw-inset-0 tw-pointer-events-none tw-overflow-hidden" style={{ zIndex: 0 }}>
          <ConstellationCanvas isDarkTheme={isDarkTheme} />
        </div>
      <div className="margin-top--lg">
        <Header 
            title="Apps" 
            tagline="Enhance forecasting, analysis, and water resource management by making your web applications and tools accessible to CIROH and NOAA&apos;s hydrologic research initiatives."
            buttons={[
                { label: "Add your Apps", href: contributeUrl, primary: true },
                { label: "Browse Documentation", href: docsUrl }
              ]}
        />
      </div>


      </section>

      {/* Stats */}
      <StatsBar
        loading={statsLoading}
        items={[
          { label: 'Total Apps', value: stats.totalApps },
          { label: 'Categories', value: stats.categories },
          { label: 'Contributors', value: stats.contributors },
          { label: 'Latest Update', value: stats.lastUpdated },
        ]}
      />

      <main className="tw-relative tw-z-20">
        <HydroShareResourcesSelector
          keyword="ciroh_hub_notebooks"
          defaultImage={defaultImage}
          variant="modern"
          onResultsChange={onResultsChange}
        />

        <div className="tw-pb-16">
          <TechBox items={items} type={"Applications"} tethys />
        </div>
      </main>
    </>
  );
}
