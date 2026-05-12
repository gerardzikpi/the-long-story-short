import {motion}  from "motion/react"


export default function Philosophy() {
    return (
        <div>
            <motion.div
                className="p-20 mt-4 mx-2 my-2 font-display text-4xl w-full h-100 rounded-xl shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
               <h3>Our Philosophy</h3>
               <hr className="my-4 border-gray-300 w-70" />
                <p className="mt-4 text-lg text-gray-700">
                    The <strong>Long Story Short</strong> is dedicated to delivering concise, 
                    engaging stories that captivate readers without 
                    overwhelming them. We believe in the power of brevity 
                    and the art of storytelling, striving to create content 
                    that is both meaningful and easily digestible. 
                    Our mission is to provide a platform for writers to share 
                    their stories in a way that resonates with readers, 
                    fostering a community of short story enthusiasts.
                </p>
            </motion.div>
        </div>
    )
}