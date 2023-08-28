import React from 'react'
import ContentLoader, { BulletList } from "react-content-loader"

export default function Sciletons() {

    return (
        <ContentLoader
            speed={2}
            width={280}
            height={579}
            viewBox="0 0 280 579"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="3" y="3" rx="3" ry="3" width="280" height="380" />
            <rect x="4" y="400" rx="3" ry="3" width="280" height="30" />
            <rect x="4" y="435" rx="3" ry="3" width="70" height="14" />
            <rect x="4" y="454" rx="3" ry="3" width="280" height="24" />
            <rect x="4" y="483" rx="3" ry="3" width="280" height="38" />
            <rect x="4" y="526" rx="3" ry="3" width="280" height="38" />
        </ContentLoader>
    )
}