import { useEffect } from 'react';
import { siteConfig } from '../data/site';

export default function SEO({ title, description, ogType = 'website' }) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${siteConfig.brandName}`
      : `${siteConfig.brandName} | Underground Electronic Collective & DJ Brand`;
    
    document.title = fullTitle;

    const desc = description || siteConfig.heroDescription;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', desc);

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    let ogSite = document.querySelector('meta[property="og:site_name"]');
    if (ogSite) ogSite.setAttribute('content', siteConfig.brandName);

    let ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (ogTypeEl) ogTypeEl.setAttribute('content', ogType);

  }, [title, description, ogType]);

  return null;
}
