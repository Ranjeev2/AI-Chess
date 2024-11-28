import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GitlabIcon as GitHub, Twitter, Linkedin, Mail, Phone, MapPin, ChevronRight, PuzzleIcon as Chess } from 'lucide-react';
import { Button, Tooltip } from '@mui/material';
import axios from 'axios';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/newsletter/status');
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  const handleUnsubscribe = async () => {
    try {
      await axios.post('http://localhost:5000/api/newsletter/unsubscribe');
      setIsSubscribed(false);
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Chess className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Chess AI</h3>
            </div>
            <p className="text-sm text-gray-300">Elevate your chess game with AI-powered challenges and personalized strategies.</p>
            <div className="flex space-x-4">
              <Tooltip title="GitHub">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <GitHub className="w-6 h-6" />
                </a>
              </Tooltip>
              <Tooltip title="Twitter">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Tooltip>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Profile', 'Play Now', 'Daily Challenge', 'Newsletter'].map((item, index) => (
                <li key={index}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="flex items-center text-sm hover:text-blue-400 transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <p className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" />
                info@chessai.com
              </p>
              <p className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +91 - 9960765259
              </p>
              <p className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                NIIT UNIVERSITY, NEEMRANA, Rajasthan, India
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm text-gray-300">Stay updated with our latest features and chess tips!</p>
            {isSubscribed ? (
            <Button 
              onClick={handleUnsubscribe}
              variant="contained" 
              fullWidth
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Unsubscribe from Newsletter
            </Button>
          ) : (
            <Link to="/newsletter">
              <Button 
                variant="contained" 
                fullWidth
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Subscribe to Newsletter
              </Button>
            </Link>
          )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Chess AI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

