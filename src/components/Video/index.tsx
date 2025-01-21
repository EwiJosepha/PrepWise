
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import prepwise1 from '@/assets/images/wise1.jpg'
import VideoSVG from "../svg-components/video-svg";

const Video = () => {

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 bg-primary">
      <div className="container mx-auto">
        <SectionTitle
          title="We are ready to help"
          paragraph="See for yourself how it works"
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src={prepwise1} alt="video image"  fill/>
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    aria-label="video play button"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full  bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                 <VideoSVG/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center my-4">
      <iframe id="vp1X0pIt" title="Video Player" width="432" height="243" frameBorder="0" src="https://s3.amazonaws.com/embed.animoto.com/play.html?w=swf/production/vp1&e=1737424243&f=X0pIt19UywkLE7Lw88qG0Q&d=0&m=p&r=360p+720p&volume=100&start_res=720p&i=m&asset_domain=s3-p.animoto.com&animoto_domain=animoto.com&options=" allowFullScreen></iframe>
        </div> */}

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
