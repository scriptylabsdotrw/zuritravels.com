/* Brand block at the very top of the admin sidebar — full logo + studio caption. */

import Image from 'next/image';

export default function AdminIcon() {
  return (
    <span className="soulx-brandblock">
      <Image
        src="/logos/primary_logo_safari_olive_transparent.png"
        alt="Zuri Travels"
        width={2172}
        height={258}
        priority
        className="soulx-brandblock__mark"
      />
      <span className="soulx-brandblock__caption">Studio Admin</span>
    </span>
  );
}
