"use client";
import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      company: "Company A",
      position: "Senior Frontend Engineer",
      period: "2021 - Present",
    },
    {
      company: "Company B",
      position: "Frontend Developer",
      period: "2019 - 2021",
    },
    {
      company: "Company C",
      position: "Junior Developer",
      period: "2017 - 2019",
    },
  ];

  return (
    <section className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-medium"
      >
        Work Experience
      </motion.h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group space-y-1"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{exp.company}</h3>
              <span className="text-sm text-muted-foreground">
                {exp.period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{exp.position}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
