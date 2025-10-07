import React, { useCallback } from "react"
import { useDotButton } from "../utils/useDotButtons"
import { usePrevNextButtons } from "@utils/usePrevNextButtons"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { Image } from "@components/Image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx(
        "text-white text-[24px] lg:text-[42px] font-semibold leading-[115%] text-center",
        className
      )}
    >
      {title}
    </h2>
  )
}

const NavigationButtons = ({ emblaApi, className }) => {
  const onNavButtonClick = useCallback(emblaApi => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

    resetOrStop()
  }, [])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick)

  return (
    <div className={clsx("flex items-center gap-5 lg:gap-9", className)}>
      <button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className={clsx(
          "w-10 h-10 rounded-full border-2 border-[#DDDDDD] lg:border-white cursor-pointer flex justify-center items-center",
          prevBtnDisabled && "opacity-50"
        )}
        aria-label="previous slide"
      >
        <ChevronLeft size={20} strokeWidth={2} className="text-[#4E4E4E] lg:text-white" />
      </button>
      <div className="flex items-center gap-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-[14px] h-[14px] rounded-full border-2 cursor-pointer transition-all duration-200 ${
              index === selectedIndex
                ? "bg-[#91CB00] border-[#91CB00] lg:bg-white lg:border-white"
                : "bg-transparent border-[#DDDDDD] lg:bg-transparent lg:border-[#DDDDDD]"
            }`}
          />
        ))}
      </div>
      <button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className={clsx(
          "w-10 h-10 rounded-full border-2 border-[#DDDDDD] lg:border-white cursor-pointer flex justify-center items-center",
          nextBtnDisabled && "opacity-50"
        )}
        aria-label="next slide"
      >
        <ChevronRight size={20} strokeWidth={2} className="text-[#4E4E4E] lg:text-white" />
      </button>
    </div>
  )
}

const Carousel = props => {
  const { images, title, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className="flex flex-col gap-3 justify-center items-center">
      <div className="relative mx-auto w-screen max-w-[1920px] overflow-hidden max-h-[calc(100vh-112px)]">
        <div ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div className="min-w-0 basis-full  grow-0 shrink-0" key={index}>
                <Image src={image} alt={`slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D900] to-[#000000B2]"></div>

        <Title title={title} className="lg:hidden text-center absolute bottom-5 px-8 w-full" />

        <div className="absolute bottom-10 left-10 right-10 hidden lg:flex justify-between items-center gap-5">
          {title && <Title title={title} />}
          <NavigationButtons emblaApi={emblaApi} />
        </div>
      </div>
      <NavigationButtons emblaApi={emblaApi} className="lg:hidden" />
    </section>
  )
}

export default Carousel
