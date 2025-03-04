'use client';

import { motion, useMotionValue, useAnimation, useTransform, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { eventsData, assets } from "@/assets/assets";

export default function EventsSection() {
    const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
        typeof window !== 'undefined' ? window.innerWidth <= 640 : false
    );

    useEffect(() => {
        const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = eventsData.length;
    const faceWidth = (cylinderWidth / faceCount) * 1.5;
    const radius = cylinderWidth / (2 * Math.PI);

    const dragFactor = 0.05;
    const rotation = useMotionValue(0);
    const controls = useAnimation();
    const transform = useTransform(rotation, (val) => `rotate3d(0,1,0,${val}deg)`);

    const startInfiniteSpin = (startAngle: number) => {
        controls.start({
            rotateY: [startAngle, startAngle - 360],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            },
        });
    };

    const handleDrag = (_: any, info: PanInfo): void => {
        controls.stop();
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (_: any, info: PanInfo): void => {
        const finalAngle = rotation.get() + info.velocity.x * dragFactor;
        rotation.set(finalAngle);
        startInfiniteSpin(finalAngle);
    };

    return (
        <section
            id="events"
            className="w-full min-h-screen py-20 px-6 md:px-12 text-white bg-cover bg-center relative  overflow-hidden"
            style={{ backgroundImage: `url(${assets.blurredBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}
        >

            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-center"
            >
                Explore Our Signature Events
            </motion.h1>

            <div className="relative h-[500px] w-full overflow-hidden mt-12">
                <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
                    <motion.div
                        drag="x"
                        dragElastic={0}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ transform: transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
                        className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
                    >
                        {eventsData.map((event, i) => (
                            <div
                                key={event.id}
                                className="group absolute flex flex-col items-center justify-center p-[8%] [backface-visibility:hidden] text-center text-gray-900"
                                style={{
                                    width: `${faceWidth}px`,
                                    transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                                }}
                            >
                                <img src={event.image} alt={event.title} className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[100px] sm:w-[220px]" />
                                <h2 className="mt-4 text-lg font-bold">{event.title}</h2>
                                <h3 className="text-sm text-gray-700">Hosted by {event.chapter}</h3>
                                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                                <Link href={`/chapters/${event.slug}`}>
                                    <Button className="mt-4">View More</Button>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link href="/events">
                    <Button variant="outline" className="px-6 py-3">See More Events</Button>
                </Link>
            </div>
        </section>
    );
}
