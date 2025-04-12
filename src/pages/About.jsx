import React from "react";
import quan1 from "../assets/quan1.jpg";
import quan2 from "../assets/quan2.jpg";
import quan3 from "../assets/quan3.jpg";
import quan4 from "../assets/quan4.jpg";

const aboutImages = [quan1, quan2, quan3, quan4];

const About = () => {
  return (
    <div className="bg-[#fdf8f0] min-h-screen px-8 py-12 font-sans">
      <h1 className="text-2xl font-bold text-center text-[#6b3f24] mb-6">VỀ CHÚNG TÔI</h1>
      <p className="text-center text-[#6b3f24] max-w-2xl mx-auto mb-10">
        Chúng tôi là một quán cà phê nhỏ xinh nằm giữa lòng thành phố, nơi bạn có thể thưởng thức những ly đồ uống thơm ngon trong không gian ấm cúng và gần gũi. Mỗi hình ảnh dưới đây đều là một góc nhỏ mà chúng tôi tự hào mang đến cho khách hàng.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {aboutImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Quán cà phê ${index + 1}`}
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
        ))}
      </div>
    </div>
  );
};

export default About;
