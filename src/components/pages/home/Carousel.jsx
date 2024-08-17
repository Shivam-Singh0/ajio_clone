import { Carousel } from "@material-tailwind/react";


export function Slider({ items }) {

  return (
    <Carousel className="rounded-xl" prevArrow={() => (null)} nextArrow={() => (null)} autoplay={true} transition={{ duration: 0.02, type: 'ease-in' }} loop={true}>
      {items.map((item, index) => (
        <div key={index} className="relative h-[600px]  w-full rounded-xl">
          <img
            src={item.src}
            alt="image 1"
            className="h-full w-full object-fill rounded-xl"
          />

        </div>
      ))}

    </Carousel>
  );
}