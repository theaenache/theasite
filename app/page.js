import Slideshow from '@/components/Slideshow';
import NavMarquee from '@/components/NavMarquee';
import FriendsMarquee from '@/components/FriendsMarquee';
import { HomeFooter } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Full screen slideshow (flush under the header) */}
      <div style={{ marginTop: '-76px' }}>
        <Slideshow />
      </div>

      {/* Scrolling nav bar */}
      <NavMarquee />

      {/* Footer with socials */}
      <HomeFooter />
    </>
  );
}