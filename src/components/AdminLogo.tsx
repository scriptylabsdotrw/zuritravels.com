/* Renders on the Payload login screen + top-left brand area.
   Sized for the central login card (white background, ~360px wide). */

import Image from 'next/image';

export default function AdminLogo() {
  return (
    <div className="soulx-admin-logo">
      <Image
        src="/logos/primary_logo_safari_olive_transparent.png"
        alt="Zuri Travels"
        width={2172}
        height={258}
        priority
      />
      <span className="soulx-admin-logo__caption">Studio Admin</span>
    </div>
  );
}
