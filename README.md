# Placement.ai - AI-Powered Career Platform

> Find your dream job, learn in-demand skills, and connect with industry mentors.

## Overview

Placement.ai is a comprehensive career platform designed to transform the job search experience. It combines AI-powered job matching, personalized skill development, mentorship connections, and community support to help users build meaningful careers in tech.
video : [https://youtu.be/mldQfBK_WmA?feature=shared]

![image](https://github.com/user-attachments/assets/47489e15-f395-4449-bf0b-077d7de77388)

## Key Features

- **AI-Powered Job Search**: Intelligent job matching based on skills, experience, and career goals
- **Personalized Learning**: AI-generated learning content tailored to your skill gaps and career aspirations
- **Expert Mentorship**: Connect with industry professionals for guidance and career advice
- **Resume Builder & Analysis**: Create and optimize your resume with AI-powered feedback
- **Skill Assessments**: Evaluate your skills and identify areas for improvement
- **Community Forum**: Connect with peers, share experiences, and get advice
- **Mock Interviews**: Practice with AI or schedule sessions with industry experts
- **Career Tracking**: Monitor your job applications, interviews, and skill development

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **AI Integration**: Google Generative AI (Gemini), AI SDK
- **Authentication**: (Placeholder for auth solution)
- **Deployment**: Vercel

## Challenges and Solutions

### 1. AI Integration Challenges

**Challenge**: Initially, we faced issues with the Gemini API integration, receiving errors when generating learning content.

**Solution**: We switched from using "gemini-2.0-flash" to "gemini-2.0-flash-lite" model and implemented proper error handling. We also created a dedicated API route for AI requests to better manage the communication with Google's Generative AI.

### 2. Responsive Design Across Multiple Devices

**Challenge**: Creating a consistent user experience across desktop, tablet, and mobile devices with complex UI components.

**Solution**: Implemented a mobile-first approach with Tailwind CSS, using responsive utility classes and custom components that adapt to different screen sizes. We also created a dedicated mobile menu component for smaller screens.

### 3. Performance Optimization

**Challenge**: Ensuring fast page loads with content-heavy pages and AI-generated content.

**Solution**: Implemented loading states, suspense boundaries, and streaming responses for AI content. We also optimized component rendering and used Next.js App Router features like server components where appropriate.

### 4. User Experience for Job Search

**Challenge**: Creating an intuitive and efficient job search experience that helps users find relevant opportunities quickly.

**Solution**: Developed a comprehensive filtering system, skill-based search, and personalized job recommendations. We also implemented a clean, card-based UI for job listings with clear visual hierarchy.

### 5. Cross-Platform Consistency

**Challenge**: Maintaining consistent behavior and appearance across different browsers and devices.

**Solution**: Established a robust component library with shadcn/ui, implemented comprehensive testing across platforms, and used CSS variables for theming to ensure visual consistency.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshatjaiin/job-search-platform
   cd job-search-platform
   npm install
   npm run dev
   ```

![image](https://github.com/user-attachments/assets/f447a466-fee4-4fd3-b442-407556a6a843)
![image](https://github.com/user-attachments/assets/e5bf9e57-89df-484a-9422-ceec10f5901b)

