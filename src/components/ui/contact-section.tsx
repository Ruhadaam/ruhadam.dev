"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send,
  Phone,
  Linkedin,
  Github,
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { sendContactEmail } from "@/src/actions/contact.actions";

export const ContactSection = () => {
  const t = useTranslations("Contact");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong.");
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "alperengokcek06@gmail.com",
      href: "mailto:alperengokcek06@gmail.com",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Telefon",
      value: "553 343 25 06",
      href: "tel:+905533432506",
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Konum",
      value: "Ankara, Türkiye",
      href: "#",
      color: "bg-zinc-800/10 text-zinc-800 dark:bg-white/10 dark:text-white",
    },
  ];

  return (
    <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-12 self-start ml-0 lg:ml-4 text-left">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-blue-500/50" />
          <Text className="text-[0.65rem] font-bold tracking-[0.4em] uppercase text-blue-500">
            {t("badge")}
          </Text>
        </motion.div>
        
        <Heading className="text-4xl md:text-5xl lg:text-6xl">
          {t("title")}
        </Heading>
        <Text className="text-zinc-500 dark:text-zinc-400 max-w-lg">
          {t("description")}
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form - Glassmorphism Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="md:col-span-2"
        >
          <Card className="p-8 bg-white/5 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-50 pointer-events-none" />
            
            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 ml-1">
                    {t("form.name")}
                  </label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="Alperen Gökçek"
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-500 outline-hidden transition-all placeholder:text-zinc-400 text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 ml-1">
                    {t("form.email")}
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="mail@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-500 outline-hidden transition-all placeholder:text-zinc-400 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.6rem] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 ml-1">
                  {t("form.subject")}
                </label>
                <div className="relative">
                  <select 
                    name="subject"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-500 outline-hidden transition-all text-sm font-medium appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>{t("form.subject")}</option>
                    <option value="collaboration">{t("form.subjects.collaboration")}</option>
                    <option value="project">{t("form.subjects.project")}</option>
                    <option value="question">{t("form.subjects.question")}</option>
                    <option value="other">{t("form.subjects.other")}</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.6rem] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 ml-1">
                  {t("form.message")}
                </label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full px-5 py-4 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-500 outline-hidden transition-all placeholder:text-zinc-400 text-sm font-medium resize-none"
                />
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  disabled={status === "loading"}
                  className="group/btn w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      {t("status.sending")}
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-500 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {t("status.success")}
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-rose-500 text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4" />
                    {errorMessage || t("status.error")}
                  </motion.div>
                )}
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:col-span-2 gap-4">
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
              className="group p-5 rounded-3xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 flex flex-col gap-4 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${method.color}`}>
                {method.icon}
              </div>
              <div className="space-y-1">
                <p className="text-[0.6rem] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
                  {method.label}
                </p>
                <p 
                  className="text-xs lg:text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors break-all"
                  title={method.value}
                >
                  {method.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
