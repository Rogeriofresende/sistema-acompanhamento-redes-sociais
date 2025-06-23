import React from "react";
import { Header } from "@/features/header";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: "dashboard" | "videos" | "newsletter";
  onNavigateToDashboard?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToNewsletter?: () => void;
}

export default function Layout({
  children,
  currentPage = "dashboard",
  onNavigateToDashboard = () => {},
  onNavigateToVideos = () => {},
  onNavigateToNewsletter = () => {},
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToVideos={onNavigateToVideos}
        onNavigateToNewsletter={onNavigateToNewsletter}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Beehiiv API Integration for Newsletter */}
        <div className="hidden">
          {/* This is a hidden div that contains the Beehiiv API integration code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
 // Beehiiv API Integration
 const BEEHIIV_API_KEY = 'your_beehiiv_api_key';
 const BEEHIIV_PUBLICATION_ID = 'your_publication_id';
 
 // Function to subscribe a user to the newsletter
 async function subscribeToBeehiiv(email, firstName = '', lastName = '') {
 try {
 const response = await fetch('https://api.beehiiv.com/v2/subscribers', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 'Authorization': \`Bearer \${BEEHIIV_API_KEY}\`
 },
 body: JSON.stringify({
 email: email,
 publication_id: BEEHIIV_PUBLICATION_ID,
 first_name: firstName,
 last_name: lastName,
 utm_source: 'lancei-essa-platform',
 reactivate_existing: true,
 send_welcome_email: true
 })
 });
 
 const data = await response.json();
 return data;
 } catch (error) {
 console.error('Error subscribing to newsletter:', error);
 throw error;
 }
 }
 
 // Function to get subscriber status
 async function getSubscriberStatus(email) {
 try {
 const response = await fetch(\`https://api.beehiiv.com/v2/publications/\${BEEHIIV_PUBLICATION_ID}/subscribers/status?email=\${encodeURIComponent(email)}\`, {
 method: 'GET',
 headers: {
 'Authorization': \`Bearer \${BEEHIIV_API_KEY}\`
 }
 });
 
 const data = await response.json();
 return data;
 } catch (error) {
 console.error('Error checking subscriber status:', error);
 throw error;
 }
 }
 
 // Function to unsubscribe a user
 async function unsubscribeFromBeehiiv(email) {
 try {
 const response = await fetch(\`https://api.beehiiv.com/v2/publications/\${BEEHIIV_PUBLICATION_ID}/subscribers/unsubscribe\`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 'Authorization': \`Bearer \${BEEHIIV_API_KEY}\`
 },
 body: JSON.stringify({
 email: email
 })
 });
 
 const data = await response.json();
 return data;
 } catch (error) {
 console.error('Error unsubscribing from newsletter:', error);
 throw error;
 }
 }
 
 // Function to get all subscribers (with pagination)
 async function getSubscribers(limit = 100, page = 1) {
 try {
 const response = await fetch(\`https://api.beehiiv.com/v2/publications/\${BEEHIIV_PUBLICATION_ID}/subscribers?limit=\${limit}&page=\${page}\`, {
 method: 'GET',
 headers: {
 'Authorization': \`Bearer \${BEEHIIV_API_KEY}\`
 }
 });
 
 const data = await response.json();
 return data;
 } catch (error) {
 console.error('Error fetching subscribers:', error);
 throw error;
 }
 }
 
 // Export functions to window object for access in other components
 window.beehiivAPI = {
 subscribe: subscribeToBeehiiv,
 getStatus: getSubscriberStatus,
 unsubscribe: unsubscribeFromBeehiiv,
 getSubscribers: getSubscribers
 };
 `,
            }}
          />
        </div>
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Lancei Essa. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  );
}
