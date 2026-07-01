import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import './OnboardingModal.css';

const steps = [
  {
    title: "Track any country's economy",
    content: "Set up topics like 'India inflation' or 'US housing market' and EconWatch will monitor the web for relevant updates."
  },
  {
    title: "Signal, not noise",
    content: "Our AI filters out generic listicles and duplicate coverage, ensuring you only see the news that matters."
  },
  {
    title: "Structured, not overwhelming",
    content: "Articles are summarized into a concise headline and a 2-3 sentence structured summary with category and sentiment tags."
  },
  {
    title: "Fully customizable",
    content: "Add or remove topics, sources, and competitors at any time from your settings panel to refine your feed."
  },
  {
    title: "Built with AI acceleration ⚡",
    content: "This MVP was architected and built to demonstrate an AI-accelerated development workflow for Swift Robotics."
  }
];

export default function OnboardingModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset step if opened again
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="onboarding-overlay">
      <motion.div 
        className="onboarding-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className="onboarding-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="onboarding-progress-bar">
          <div className="onboarding-progress" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="onboarding-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2>{steps[currentStep].title}</h2>
              <p>{steps[currentStep].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="onboarding-footer">
          <div className="onboarding-dots">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`onboarding-dot ${i === currentStep ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="onboarding-actions">
            {currentStep > 0 ? (
              <button className="btn btn-secondary" onClick={prevStep}>
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={onClose}>
                Skip
              </button>
            )}
            
            <button className="btn btn-primary" onClick={nextStep}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
