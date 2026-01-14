import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const HelpDesk = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  });

  const questions = [
    "Hi 👋 I’m Start Core 360 Assistant. What is your name?",
    "Nice to meet you! What is your email?",
    "Tell me briefly about your startup idea or requirement.",
    "Which service are you interested in? (Website, Branding, Launch, Growth)",
  ];

  const handleNext = async (value) => {
    if (step === 0) setForm({ ...form, name: value });
    if (step === 1) setForm({ ...form, email: value });
    if (step === 2) setForm({ ...form, message: value });
    if (step === 3) {
      const payload = { ...form, service: value };

      await axios.post("/api/startup-lead", payload); // same API as StartYourStartupPage

      setStep(4);
      return;
    }

    setStep(step + 1);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full shadow-xl"
      >
        <MessageCircle />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
              <span>Start Core 360 Help Desk</span>
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <div className="p-4 space-y-4 text-sm">

              {step < 4 && (
                <>
                  <div className="bg-slate-100 p-3 rounded-xl">
                    {questions[step]}
                  </div>

                  <input
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleNext(e.target.value)
                    }
                    placeholder="Type here..."
                    className="w-full border rounded-xl p-2"
                  />
                </>
              )}

              {step === 4 && (
                <div className="bg-green-100 p-4 rounded-xl text-green-800">
                  Thank you! Our team will contact you shortly.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpDesk;
