export const openResumeModal = () => {
  window.dispatchEvent(new CustomEvent("open-resume-modal"));
};
