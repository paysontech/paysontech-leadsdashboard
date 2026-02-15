import React, { useState } from 'react';
import { Search, Download, Mail, Phone, MapPin, Building2, Briefcase, ExternalLink, Filter, Loader2, CheckCircle2, Copy, Trash2, Tag, User, MessageSquare, Globe, Star, Users, Send } from 'lucide-react';

export default function BusinessContactDashboard() {
  const [searchParams, setSearchParams] = useState({
    query: 'small businesses',
    location: '',
    radius: '5000',
    type: 'all',
    sources: {
      google: true,
      thumbtack: true,
      yelp: true
    }
  });
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState(new Set());
  const [activeTab, setActiveTab] = useState('search');
  const [tags, setTags] = useState(['High Priority', 'Follow Up', 'Contacted', 'Hot Lead', 'Cold Lead', 'Qualified']);
  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedBusinessForTag, setSelectedBusinessForTag] = useState(null);
  const [filterOpportunity, setFilterOpportunity] = useState('all');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: 'IT Support & AI Solutions for Your Business',
    body: `Hello,

I hope this message finds you well. My name is [Your Name] from PaysonTech, and I specialize in providing comprehensive IT support and cutting-edge AI automation solutions for businesses in Arizona.

I noticed your business and believe we could help streamline your operations and enhance your technology infrastructure. Our services include:

• 24/7 IT Support & Managed Services
• Cloud Migration & Security
• AI-Powered Automation Solutions
• Data Backup & Disaster Recovery
• Cybersecurity & Compliance

I'd love to schedule a brief 15-minute call to discuss how we can help your business leverage technology more effectively.

Are you available for a quick conversation this week?

Best regards,
[Your Name]
PaysonTech
[Your Phone]
[Your Email]`
  });

  // Arizona cities and locations
  const arizonaLocations = [
    { city: 'Phoenix', state: 'AZ', zip: '85001' },
    { city: 'Tucson', state: 'AZ', zip: '85701' },
    { city: 'Mesa', state: 'AZ', zip: '85201' },
    { city: 'Chandler', state: 'AZ', zip: '85224' },
    { city: 'Scottsdale', state: 'AZ', zip: '85251' },
    { city: 'Glendale', state: 'AZ', zip: '85301' },
    { city: 'Gilbert', state: 'AZ', zip: '85233' },
    { city: 'Tempe', state: 'AZ', zip: '85281' },
    { city: 'Peoria', state: 'AZ', zip: '85345' },
    { city: 'Surprise', state: 'AZ', zip: '85374' },
    { city: 'Yuma', state: 'AZ', zip: '85364' },
    { city: 'Avondale', state: 'AZ', zip: '85323' },
    { city: 'Flagstaff', state: 'AZ', zip: '86001' },
    { city: 'Goodyear', state: 'AZ', zip: '85338' },
    { city: 'Buckeye', state: 'AZ', zip: '85326' },
    { city: 'Lake Havasu City', state: 'AZ', zip: '86403' },
    { city: 'Casa Grande', state: 'AZ', zip: '85122' },
    { city: 'Prescott Valley', state: 'AZ', zip: '86314' },
    { city: 'Sierra Vista', state: 'AZ', zip: '85635' },
    { city: 'Maricopa', state: 'AZ', zip: '85138' },
    { city: 'Oro Valley', state: 'AZ', zip: '85704' },
    { city: 'Prescott', state: 'AZ', zip: '86301' },
    { city: 'Bullhead City', state: 'AZ', zip: '86429' },
    { city: 'Apache Junction', state: 'AZ', zip: '85119' },
    { city: 'Marana', state: 'AZ', zip: '85653' },
    { city: 'El Mirage', state: 'AZ', zip: '85335' },
    { city: 'Kingman', state: 'AZ', zip: '86401' },
    { city: 'Queen Creek', state: 'AZ', zip: '85142' },
    { city: 'Florence', state: 'AZ', zip: '85132' },
    { city: 'San Tan Valley', state: 'AZ', zip: '85140' }
  ];

  // Opportunity categories for PaysonTech
  const opportunityCategories = {
    'High Priority': {
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.2)',
      description: 'Immediate IT needs, high-value target'
    },
    'Strong Fit': {
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      description: 'Good potential, needs modern IT infrastructure'
    },
    'Medium Potential': {
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.2)',
      description: 'Some IT needs, may benefit from AI agents'
    },
    'Low Priority': {
      color: '#6b7280',
      bgColor: 'rgba(107, 116, 128, 0.2)',
      description: 'Limited IT requirements'
    }
  };

  const businessTypes = [
    { value: 'all', label: 'All Business Types' },
    { value: 'accounting', label: 'Accounting Firms' },
    { value: 'real_estate_agency', label: 'Real Estate' },
    { value: 'lawyer', label: 'Law Firms' },
    { value: 'insurance_agency', label: 'Insurance' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'retail', label: 'Retail Stores' },
    { value: 'medical', label: 'Medical Offices' },
    { value: 'contractor', label: 'Contractors' }
  ];

  // Simulated multi-source search - in production, this would call Google Places, Thumbtack & Yelp APIs
  const searchBusinesses = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data with validated addresses across Arizona
    const mockResults = [
      {
        id: '1',
        name: 'Summit Accounting & Tax Services',
        address: '1425 E Washington St, Phoenix, AZ 85034',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85034',
        lat: 33.4484,
        lng: -112.0595,
        phone: '(602) 555-0123',
        email: 'info@summitaccounting.com',
        website: 'summitaccounting.com',
        type: 'Accounting',
        rating: 4.7,
        employees: '5-10',
        status: 'Not Contacted',
        sources: ['Google', 'Yelp'],
        contacts: [
          { name: 'Michael Chen', role: 'Owner', email: 'mchen@summitaccounting.com', phone: '(602) 555-0124' },
          { name: 'Sarah Johnson', role: 'Office Manager', email: 'sjohnson@summitaccounting.com', phone: '(602) 555-0125' }
        ],
        linkedin: 'linkedin.com/company/summit-accounting',
        facebook: 'facebook.com/summitaccounting',
        tags: [],
        reviewCount: 87,
        yearsInBusiness: 12,
        opportunity: 'High Priority',
        itNeeds: ['Cloud accounting security', 'Data backup & recovery', 'Client portal management', 'Tax software integration'],
        aiOpportunities: ['Document processing automation', 'Client inquiry chatbot', 'Invoice extraction AI'],
        techStack: 'QuickBooks, Excel, Email',
        painPoints: 'Manual data entry, no disaster recovery plan, legacy systems'
      },
      {
        id: '2',
        name: 'Desert Rose Real Estate',
        address: '3890 N Central Ave, Phoenix, AZ 85012',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85012',
        lat: 33.4791,
        lng: -112.0742,
        phone: '(602) 555-0456',
        email: 'contact@desertrosere.com',
        website: 'desertrosere.com',
        type: 'Real Estate',
        rating: 4.5,
        employees: '10-20',
        status: 'Not Contacted',
        sources: ['Google', 'Thumbtack', 'Yelp'],
        contacts: [
          { name: 'Jennifer Martinez', role: 'Broker/Owner', email: 'jmartinez@desertrosere.com', phone: '(602) 555-0457' },
          { name: 'David Kim', role: 'IT Coordinator', email: 'dkim@desertrosere.com', phone: '(602) 555-0458' }
        ],
        linkedin: 'linkedin.com/company/desert-rose-realty',
        facebook: 'facebook.com/desertroserealty',
        tags: [],
        reviewCount: 134,
        yearsInBusiness: 8,
        opportunity: 'Strong Fit',
        itNeeds: ['CRM system optimization', 'Mobile device management', 'Video conferencing setup', 'Network security'],
        aiOpportunities: ['Lead qualification AI', 'Property description generator', 'Virtual showing scheduler'],
        techStack: 'Zillow, basic CRM, Google Workspace',
        painPoints: 'Agent coordination, lead management inefficiency'
      },
      {
        id: '3',
        name: 'Tucson Legal Partners',
        address: '220 S Stone Ave, Tucson, AZ 85701',
        city: 'Tucson',
        state: 'AZ',
        zip: '85701',
        lat: 32.2217,
        lng: -110.9698,
        phone: '(520) 555-0789',
        email: 'admin@tucsonlegal.com',
        website: 'tucsonlegalpartners.com',
        type: 'Law Firm',
        rating: 4.8,
        employees: '20-50',
        status: 'Not Contacted',
        sources: ['Google', 'Yelp'],
        contacts: [
          { name: 'Robert Anderson', role: 'Managing Partner', email: 'randerson@tucsonlegal.com', phone: '(520) 555-0790' },
          { name: 'Lisa Thompson', role: 'Operations Director', email: 'lthompson@tucsonlegal.com', phone: '(520) 555-0791' },
          { name: 'James Wilson', role: 'IT Manager', email: 'jwilson@tucsonlegal.com', phone: '(520) 555-0792' }
        ],
        linkedin: 'linkedin.com/company/tucson-legal-partners',
        facebook: null,
        tags: [],
        reviewCount: 203,
        yearsInBusiness: 15,
        opportunity: 'High Priority',
        itNeeds: ['Compliance & security', 'Document management system', 'Encrypted communications', 'Case management software'],
        aiOpportunities: ['Legal research assistant', 'Contract analysis AI', 'Case outcome prediction', 'Automated billing'],
        techStack: 'Clio, Microsoft Office, VPN',
        painPoints: 'Security compliance concerns, document version control'
      },
      {
        id: '4',
        name: 'Scottsdale Insurance Group',
        address: '7373 N Scottsdale Rd, Scottsdale, AZ 85253',
        city: 'Scottsdale',
        state: 'AZ',
        zip: '85253',
        lat: 33.5470,
        lng: -111.9260,
        phone: '(480) 555-0234',
        email: 'hello@scottsdaleinsurance.com',
        website: 'scottsdaleinsurancegroup.com',
        type: 'Insurance',
        rating: 4.6,
        employees: '5-10',
        status: 'Not Contacted',
        sources: ['Google', 'Thumbtack'],
        contacts: [
          { name: 'Amanda Rodriguez', role: 'Principal Agent', email: 'arodriguez@scottsdaleinsurance.com', phone: '(480) 555-0235' },
          { name: 'Mark Stevens', role: 'Business Manager', email: 'mstevens@scottsdaleinsurance.com', phone: '(480) 555-0236' }
        ],
        linkedin: 'linkedin.com/company/scottsdale-insurance',
        facebook: 'facebook.com/scottsdaleinsurancegroup',
        tags: [],
        reviewCount: 92,
        yearsInBusiness: 6,
        opportunity: 'Strong Fit',
        itNeeds: ['Customer database security', 'Email automation', 'Cloud backup', 'Mobile access'],
        aiOpportunities: ['Policy recommendation AI', 'Claims processing automation', 'Customer service chatbot'],
        techStack: 'AgencyBloc, Gmail, Dropbox',
        painPoints: 'Manual policy comparisons, customer follow-up'
      },
      {
        id: '5',
        name: 'Mesa Medical Associates',
        address: '1955 S Stapley Dr, Mesa, AZ 85204',
        city: 'Mesa',
        state: 'AZ',
        zip: '85204',
        lat: 33.3853,
        lng: -111.8068,
        phone: '(480) 555-0567',
        email: 'office@mesamedical.com',
        website: 'mesamedicalaz.com',
        type: 'Medical',
        rating: 4.9,
        employees: '10-20',
        status: 'Not Contacted',
        sources: ['Google', 'Yelp'],
        contacts: [
          { name: 'Dr. Emily Parker', role: 'Practice Owner', email: 'eparker@mesamedical.com', phone: '(480) 555-0568' },
          { name: 'Kevin Brown', role: 'Practice Administrator', email: 'kbrown@mesamedical.com', phone: '(480) 555-0569' }
        ],
        linkedin: 'linkedin.com/company/mesa-medical-az',
        facebook: 'facebook.com/mesamedicalassociates',
        tags: [],
        reviewCount: 318,
        yearsInBusiness: 10,
        opportunity: 'High Priority',
        itNeeds: ['HIPAA compliance', 'EHR optimization', 'Telehealth infrastructure', 'Patient data security'],
        aiOpportunities: ['Appointment scheduling AI', 'Medical transcription', 'Patient triage chatbot', 'Prior authorization automation'],
        techStack: 'Epic/Cerner, Patient portal',
        painPoints: 'Regulatory compliance, appointment no-shows, staff burnout'
      },
      {
        id: '6',
        name: 'Flagstaff Tech Consultants',
        address: '15 N Leroux St, Flagstaff, AZ 86001',
        city: 'Flagstaff',
        state: 'AZ',
        zip: '86001',
        lat: 35.1983,
        lng: -111.6513,
        phone: '(928) 555-0890',
        email: 'info@flagstafftech.com',
        website: 'flagstafftechconsultants.com',
        type: 'Marketing',
        rating: 4.7,
        employees: '10-20',
        status: 'Not Contacted',
        sources: ['Google', 'Thumbtack', 'Yelp'],
        contacts: [
          { name: 'Chris Taylor', role: 'CEO', email: 'ctaylor@flagstafftech.com', phone: '(928) 555-0891' },
          { name: 'Nicole Garcia', role: 'COO', email: 'ngarcia@flagstafftech.com', phone: '(928) 555-0892' }
        ],
        linkedin: 'linkedin.com/company/flagstaff-tech-consultants',
        facebook: 'facebook.com/flagstafftechaz',
        tags: [],
        reviewCount: 156,
        yearsInBusiness: 7,
        opportunity: 'Medium Potential',
        itNeeds: ['Creative software licensing', 'Cloud collaboration', 'File storage solutions', 'Client access portals'],
        aiOpportunities: ['Content generation AI', 'Social media scheduling', 'Campaign analytics AI', 'Ad copy optimization'],
        techStack: 'Adobe Creative Suite, HubSpot, Slack',
        painPoints: 'Client collaboration, project management, creative workflow'
      },
      {
        id: '7',
        name: 'Chandler Dental Group',
        address: '2929 W Frye Rd, Chandler, AZ 85224',
        city: 'Chandler',
        state: 'AZ',
        zip: '85224',
        lat: 33.2333,
        lng: -111.8929,
        phone: '(480) 555-1234',
        email: 'info@chandlerdental.com',
        website: 'chandlerdentalgroup.com',
        type: 'Medical',
        rating: 4.8,
        employees: '5-10',
        status: 'Not Contacted',
        sources: ['Google', 'Yelp'],
        contacts: [
          { name: 'Dr. Sarah Mitchell', role: 'Owner/Dentist', email: 'smitchell@chandlerdental.com', phone: '(480) 555-1235' },
          { name: 'Tom Harris', role: 'Office Manager', email: 'tharris@chandlerdental.com', phone: '(480) 555-1236' }
        ],
        linkedin: 'linkedin.com/company/chandler-dental',
        facebook: 'facebook.com/chandlerdentalgroup',
        tags: [],
        reviewCount: 245,
        yearsInBusiness: 14,
        opportunity: 'High Priority',
        itNeeds: ['Patient management system', 'HIPAA compliance', 'Online booking integration', 'Backup solutions'],
        aiOpportunities: ['Appointment reminder automation', 'Insurance verification AI', 'Patient education chatbot'],
        techStack: 'Dentrix, basic website',
        painPoints: 'Appointment scheduling conflicts, insurance processing delays'
      },
      {
        id: '8',
        name: 'Tempe Consulting Partners',
        address: '60 E Rio Salado Pkwy, Tempe, AZ 85281',
        city: 'Tempe',
        state: 'AZ',
        zip: '85281',
        lat: 33.4304,
        lng: -111.9382,
        phone: '(480) 555-5678',
        email: 'contact@tempeconsulting.com',
        website: 'tempeconsultingpartners.com',
        type: 'Accounting',
        rating: 4.6,
        employees: '10-20',
        status: 'Not Contacted',
        sources: ['Google', 'Thumbtack', 'Yelp'],
        contacts: [
          { name: 'Rachel Green', role: 'Managing Partner', email: 'rgreen@tempeconsulting.com', phone: '(480) 555-5679' },
          { name: 'Mike Ross', role: 'Technology Director', email: 'mross@tempeconsulting.com', phone: '(480) 555-5680' }
        ],
        linkedin: 'linkedin.com/company/tempe-consulting',
        facebook: 'facebook.com/tempeconsulting',
        tags: [],
        reviewCount: 178,
        yearsInBusiness: 9,
        opportunity: 'Strong Fit',
        itNeeds: ['Cloud infrastructure', 'Data analytics tools', 'Client collaboration platform', 'Cybersecurity'],
        aiOpportunities: ['Financial forecasting AI', 'Report generation automation', 'Client insights dashboard'],
        techStack: 'Salesforce, Tableau, Zoom',
        painPoints: 'Data silos, remote team coordination'
      },
      {
        id: '9',
        name: 'Gilbert Business Solutions',
        address: '50 E Civic Center Dr, Gilbert, AZ 85296',
        city: 'Gilbert',
        state: 'AZ',
        zip: '85296',
        lat: 33.3528,
        lng: -111.7890,
        phone: '(480) 555-9012',
        email: 'info@gilbertbiz.com',
        website: 'gilbertbusinesssolutions.com',
        type: 'Accounting',
        rating: 4.5,
        employees: '5-10',
        status: 'Not Contacted',
        sources: ['Google', 'Yelp'],
        contacts: [
          { name: 'Patricia Wong', role: 'Founder & CEO', email: 'pwong@gilbertbiz.com', phone: '(480) 555-9013' }
        ],
        linkedin: 'linkedin.com/company/gilbert-business-solutions',
        facebook: 'facebook.com/gilbertbizsolutions',
        tags: [],
        reviewCount: 112,
        yearsInBusiness: 5,
        opportunity: 'Medium Potential',
        itNeeds: ['Accounting software integration', 'Remote work setup', 'Cloud storage', 'Email security'],
        aiOpportunities: ['Expense categorization AI', 'Invoice processing', 'Financial report automation'],
        techStack: 'QuickBooks Online, Microsoft 365',
        painPoints: 'Manual bookkeeping, client onboarding delays'
      },
      {
        id: '10',
        name: 'Glendale Family Law',
        address: '5747 W Glendale Ave, Glendale, AZ 85301',
        city: 'Glendale',
        state: 'AZ',
        zip: '85301',
        lat: 33.5387,
        lng: -112.1793,
        phone: '(623) 555-3456',
        email: 'contact@glendalefamilylaw.com',
        website: 'glendalefamilylaw.com',
        type: 'Law Firm',
        rating: 4.9,
        employees: '5-10',
        status: 'Not Contacted',
        sources: ['Google', 'Thumbtack'],
        contacts: [
          { name: 'Elizabeth Cooper', role: 'Managing Attorney', email: 'ecooper@glendalefamilylaw.com', phone: '(623) 555-3457' },
          { name: 'John Martinez', role: 'Paralegal', email: 'jmartinez@glendalefamilylaw.com', phone: '(623) 555-3458' }
        ],
        linkedin: 'linkedin.com/company/glendale-family-law',
        facebook: null,
        tags: [],
        reviewCount: 167,
        yearsInBusiness: 11,
        opportunity: 'High Priority',
        itNeeds: ['Secure client portal', 'Document automation', 'E-signature integration', 'Case management'],
        aiOpportunities: ['Document review AI', 'Legal research automation', 'Client communication chatbot'],
        techStack: 'Practice management software, Outlook',
        painPoints: 'Document management, client communication tracking'
      }
    ];
    
    setBusinesses(mockResults);
    setLoading(false);
    setActiveTab('results');
  };

  const addTagToBusiness = (businessId, tag) => {
    setBusinesses(businesses.map(b => {
      if (b.id === businessId) {
        const newTags = b.tags.includes(tag) ? b.tags : [...b.tags, tag];
        return { ...b, tags: newTags };
      }
      return b;
    }));
  };

  const removeTagFromBusiness = (businessId, tag) => {
    setBusinesses(businesses.map(b => {
      if (b.id === businessId) {
        return { ...b, tags: b.tags.filter(t => t !== tag) };
      }
      return b;
    }));
  };

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedBusinesses);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBusinesses(newSelected);
  };

  const selectAll = () => {
    const filteredBusinesses = getFilteredBusinesses();
    if (selectedBusinesses.size === filteredBusinesses.length && filteredBusinesses.length > 0) {
      setSelectedBusinesses(new Set());
    } else {
      setSelectedBusinesses(new Set(filteredBusinesses.map(b => b.id)));
    }
  };

  const getFilteredBusinesses = () => {
    return businesses.filter(b => {
      const opportunityMatch = filterOpportunity === 'all' || b.opportunity === filterOpportunity;
      const locationMatch = !searchParams.location || b.city === searchParams.location.split(',')[0];
      return opportunityMatch && locationMatch;
    });
  };

  const exportToCSV = () => {
    const selected = businesses.filter(b => selectedBusinesses.has(b.id));
    
    if (selected.length === 0) {
      alert('Please select at least one business to export.');
      return;
    }

    const headers = ['Business Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Zip', 'Website', 'Type', 'Rating', 'Employees', 
                     'Contact Person', 'Contact Role', 'Contact Email', 'Contact Phone', 'LinkedIn', 'Facebook', 
                     'Sources', 'Tags', 'Reviews', 'Years in Business', 'Opportunity Level', 'IT Needs', 
                     'AI Opportunities', 'Current Tech Stack', 'Pain Points'];
    
    const rows = selected.flatMap(b => {
      if (b.contacts && b.contacts.length > 0) {
        return b.contacts.map(contact => [
          b.name,
          b.email,
          b.phone,
          b.address,
          b.city,
          b.state,
          b.zip,
          b.website,
          b.type,
          b.rating,
          b.employees,
          contact.name,
          contact.role,
          contact.email,
          contact.phone,
          b.linkedin || '',
          b.facebook || '',
          b.sources.join('; '),
          b.tags.join('; '),
          b.reviewCount || '',
          b.yearsInBusiness || '',
          b.opportunity || '',
          b.itNeeds ? b.itNeeds.join('; ') : '',
          b.aiOpportunities ? b.aiOpportunities.join('; ') : '',
          b.techStack || '',
          b.painPoints || ''
        ]);
      } else {
        return [[
          b.name,
          b.email,
          b.phone,
          b.address,
          b.city,
          b.state,
          b.zip,
          b.website,
          b.type,
          b.rating,
          b.employees,
          '',
          '',
          '',
          '',
          b.linkedin || '',
          b.facebook || '',
          b.sources.join('; '),
          b.tags.join('; '),
          b.reviewCount || '',
          b.yearsInBusiness || '',
          b.opportunity || '',
          b.itNeeds ? b.itNeeds.join('; ') : '',
          b.aiOpportunities ? b.aiOpportunities.join('; ') : '',
          b.techStack || '',
          b.painPoints || ''
        ]];
      }
    });
    
    const csvContent = [headers, ...rows].map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `paysontech-leads-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyEmails = () => {
    const selected = businesses.filter(b => selectedBusinesses.has(b.id));
    
    if (selected.length === 0) {
      alert('Please select at least one business to copy emails.');
      return;
    }

    const emails = selected.map(b => b.email).join(', ');
    
    navigator.clipboard.writeText(emails).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(err => {
      console.error('Failed to copy emails:', err);
      alert('Failed to copy emails. Please try again.');
    });
  };

  const sendEmails = () => {
    const selected = businesses.filter(b => selectedBusinesses.has(b.id));
    
    if (selected.length === 0) {
      alert('Please select at least one business to send emails.');
      return;
    }

    setShowEmailModal(true);
  };

  const handleSendEmail = () => {
    const selected = businesses.filter(b => selectedBusinesses.has(b.id));
    const emails = selected.map(b => b.email).join(',');
    
    const subject = encodeURIComponent(emailData.subject);
    const body = encodeURIComponent(emailData.body);
    
    // Open default email client with pre-filled data
    window.location.href = `mailto:${emails}?subject=${subject}&body=${body}`;
    
    setShowEmailModal(false);
  };

  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#e8e8f0'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(20, 20, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '24px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
            }}>
              <Briefcase size={24} color="#fff" />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                PaysonTech Lead Generator
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#9ca3af', fontWeight: '400' }}>
                Find and qualify businesses across Arizona for IT support & AI agent services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {['search', 'results'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                  : 'rgba(30, 30, 45, 0.6)',
                border: activeTab === tab ? 'none' : '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                boxShadow: activeTab === tab ? '0 4px 16px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div style={{
            background: 'rgba(20, 20, 35, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                Search Parameters
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                Define your search criteria to find potential IT support clients across Arizona
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* Business Type */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                  <Filter size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  Business Type
                </label>
                <select
                  value={searchParams.type}
                  onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(15, 15, 30, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '10px',
                    color: '#e8e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                  <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  Arizona City
                </label>
                <select
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(15, 15, 30, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '10px',
                    color: '#e8e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">All Arizona Cities</option>
                  {arizonaLocations.map(loc => (
                    <option key={loc.city} value={`${loc.city}, ${loc.state}`}>
                      {loc.city}, {loc.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radius */}
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                  Search Radius
                </label>
                <select
                  value={searchParams.radius}
                  onChange={(e) => setSearchParams({...searchParams, radius: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(15, 15, 30, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '10px',
                    color: '#e8e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="1000">1 mile</option>
                  <option value="5000">5 miles</option>
                  <option value="10000">10 miles</option>
                  <option value="25000">25 miles</option>
                  <option value="50000">50 miles</option>
                </select>
              </div>
            </div>

            {/* Data Sources */}
            <div style={{ marginTop: '32px' }}>
              <label style={{ display: 'block', marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                <Globe size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Data Sources
              </label>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {['google', 'thumbtack', 'yelp'].map(source => (
                  <label key={source} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={searchParams.sources[source]}
                      onChange={(e) => setSearchParams({
                        ...searchParams,
                        sources: { ...searchParams.sources, [source]: e.target.checked }
                      })}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#6366f1'
                      }}
                    />
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      color: searchParams.sources[source] ? '#e8e8f0' : '#6b7280'
                    }}>
                      {source}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={searchBusinesses}
              disabled={loading}
              style={{
                marginTop: '32px',
                padding: '16px 40px',
                background: loading 
                  ? 'rgba(99, 102, 241, 0.5)' 
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: loading ? 'none' : '0 6px 24px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Search Businesses
                </>
              )}
            </button>

            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Results Tab - Continuing from previous file... */}
        {activeTab === 'results' && (
          <div>
            {businesses.length > 0 && (
              <div style={{
                background: 'rgba(20, 20, 35, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.size > 0 && selectedBusinesses.size === getFilteredBusinesses().length}
                      onChange={selectAll}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        accentColor: '#6366f1'
                      }}
                    />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>
                      {selectedBusinesses.size} of {getFilteredBusinesses().length} selected
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={copyEmails}
                      disabled={selectedBusinesses.size === 0}
                      style={{
                        padding: '10px 20px',
                        background: copySuccess 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : selectedBusinesses.size === 0 ? 'rgba(30, 30, 45, 0.5)' : 'rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.4)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: selectedBusinesses.size === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {copySuccess ? (
                        <>
                          <CheckCircle2 size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Emails
                        </>
                      )}
                    </button>

                    <button
                      onClick={sendEmails}
                      disabled={selectedBusinesses.size === 0}
                      style={{
                        padding: '10px 20px',
                        background: selectedBusinesses.size === 0 
                          ? 'rgba(30, 30, 45, 0.5)' 
                          : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: selectedBusinesses.size === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: selectedBusinesses.size === 0 ? 'none' : '0 4px 16px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Send size={16} />
                      Send Emails
                    </button>

                    <button
                      onClick={exportToCSV}
                      disabled={selectedBusinesses.size === 0}
                      style={{
                        padding: '10px 20px',
                        background: selectedBusinesses.size === 0 
                          ? 'rgba(30, 30, 45, 0.5)' 
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: selectedBusinesses.size === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: selectedBusinesses.size === 0 ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div style={{ 
                  borderTop: '1px solid rgba(99, 102, 241, 0.2)', 
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                    Filter by:
                  </span>
                  
                  {/* Location Filter */}
                  <select
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(30, 30, 45, 0.6)',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      borderRadius: '6px',
                      color: '#e8e8f0',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="">All Cities</option>
                    {arizonaLocations.map(loc => (
                      <option key={loc.city} value={`${loc.city}, ${loc.state}`}>
                        {loc.city}
                      </option>
                    ))}
                  </select>

                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#d1d5db', marginLeft: '8px' }}>
                    Opportunity:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setFilterOpportunity('all')}
                      style={{
                        padding: '6px 16px',
                        background: filterOpportunity === 'all' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(30, 30, 45, 0.6)',
                        border: '1px solid rgba(99, 102, 241, 0.4)',
                        borderRadius: '6px',
                        color: '#e8e8f0',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      All
                    </button>
                    {Object.keys(opportunityCategories).map(opp => (
                      <button
                        key={opp}
                        onClick={() => setFilterOpportunity(opp)}
                        style={{
                          padding: '6px 16px',
                          background: filterOpportunity === opp 
                            ? opportunityCategories[opp].bgColor 
                            : 'rgba(30, 30, 45, 0.6)',
                          border: `1px solid ${filterOpportunity === opp ? opportunityCategories[opp].color : 'rgba(99, 102, 241, 0.4)'}`,
                          borderRadius: '6px',
                          color: filterOpportunity === opp ? opportunityCategories[opp].color : '#9ca3af',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {opp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {businesses.length === 0 ? (
              <div style={{
                background: 'rgba(20, 20, 35, 0.4)',
                borderRadius: '16px',
                padding: '80px 40px',
                textAlign: 'center',
                border: '1px dashed rgba(99, 102, 241, 0.3)'
              }}>
                <Search size={64} color="#6366f1" style={{ opacity: 0.5, marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No Results Yet</h3>
                <p style={{ color: '#9ca3af', margin: 0 }}>
                  Use the search tab to find local businesses across Arizona
                </p>
              </div>
            ) : getFilteredBusinesses().length === 0 ? (
              <div style={{
                background: 'rgba(20, 20, 35, 0.4)',
                borderRadius: '16px',
                padding: '80px 40px',
                textAlign: 'center',
                border: '1px dashed rgba(99, 102, 241, 0.3)'
              }}>
                <Filter size={64} color="#6366f1" style={{ opacity: 0.5, marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No Results Found</h3>
                <p style={{ color: '#9ca3af', margin: 0 }}>
                  Try adjusting your filters to see more businesses
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {getFilteredBusinesses().map(business => (
                  <div
                    key={business.id}
                    style={{
                      background: selectedBusinesses.has(business.id) 
                        ? 'rgba(99, 102, 241, 0.15)' 
                        : 'rgba(20, 20, 35, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '24px',
                      border: selectedBusinesses.has(business.id) 
                        ? '2px solid rgba(99, 102, 241, 0.6)' 
                        : '1px solid rgba(99, 102, 241, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                      <input
                        type="checkbox"
                        checked={selectedBusinesses.has(business.id)}
                        onChange={() => toggleSelection(business.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginTop: '4px',
                          cursor: 'pointer',
                          accentColor: '#6366f1'
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        {/* Business Header */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>
                              {business.name}
                            </h3>
                            {/* PaysonTech Opportunity Badge */}
                            <div style={{
                              background: opportunityCategories[business.opportunity].bgColor,
                              border: `2px solid ${opportunityCategories[business.opportunity].color}`,
                              padding: '8px 16px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              flexShrink: 0
                            }}>
                              <Briefcase size={16} color={opportunityCategories[business.opportunity].color} />
                              <div>
                                <div style={{ 
                                  fontSize: '13px', 
                                  fontWeight: '700',
                                  color: opportunityCategories[business.opportunity].color,
                                  lineHeight: '1.2'
                                }}>
                                  {business.opportunity}
                                </div>
                                <div style={{ 
                                  fontSize: '10px', 
                                  color: opportunityCategories[business.opportunity].color,
                                  opacity: 0.8,
                                  marginTop: '2px'
                                }}>
                                  PaysonTech Match
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{
                              background: 'rgba(99, 102, 241, 0.2)',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#a5b4fc'
                            }}>
                              {business.type}
                            </span>
                            <span style={{ fontSize: '14px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={14} fill="#fbbf24" />
                              {business.rating} ({business.reviewCount} reviews)
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={14} />
                              {business.employees} employees
                            </span>
                            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                              {business.yearsInBusiness} years in business
                            </span>
                          </div>

                          {/* Data Sources */}
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            {business.sources.map(source => (
                              <span key={source} style={{
                                background: source === 'Google' ? 'rgba(66, 133, 244, 0.2)' : 
                                           source === 'Yelp' ? 'rgba(211, 35, 35, 0.2)' : 
                                           'rgba(52, 152, 219, 0.2)',
                                padding: '3px 10px',
                                borderRadius: '5px',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: source === 'Google' ? '#93b7f8' : 
                                       source === 'Yelp' ? '#ff8a80' : 
                                       '#74c0fc'
                              }}>
                                {source}
                              </span>
                            ))}
                          </div>

                          {/* Tags */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {business.tags.map(tag => (
                              <span key={tag} style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#6ee7b7',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <Tag size={12} />
                                {tag}
                                <button
                                  onClick={() => removeTagFromBusiness(business.id, tag)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6ee7b7',
                                    cursor: 'pointer',
                                    padding: '0',
                                    marginLeft: '2px',
                                    fontSize: '14px',
                                    lineHeight: '1'
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            <button
                              onClick={() => {
                                setSelectedBusinessForTag(business.id);
                                setShowTagModal(true);
                              }}
                              style={{
                                background: 'rgba(99, 102, 241, 0.2)',
                                border: '1px dashed rgba(99, 102, 241, 0.4)',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#a5b4fc',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Tag size={12} />
                              Add Tag
                            </button>
                          </div>
                        </div>

                        {/* PaysonTech Opportunity Analysis */}
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '10px',
                          padding: '16px',
                          marginBottom: '16px'
                        }}>
                          <h4 style={{ 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            marginBottom: '12px',
                            color: '#a5b4fc',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <Briefcase size={16} />
                            PaysonTech Opportunity Assessment
                          </h4>
                          
                          <div style={{ display: 'grid', gap: '12px' }}>
                            {/* IT Needs */}
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600' }}>
                                IT Support Needs:
                              </div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {business.itNeeds.map((need, idx) => (
                                  <span key={idx} style={{
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    padding: '4px 10px',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    color: '#c7d2fe'
                                  }}>
                                    {need}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* AI Opportunities */}
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600' }}>
                                AI Agent Opportunities:
                              </div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {business.aiOpportunities.map((opp, idx) => (
                                  <span key={idx} style={{
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    padding: '4px 10px',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    color: '#ddd6fe'
                                  }}>
                                    {opp}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Current Tech & Pain Points */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                              <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px', fontWeight: '600' }}>
                                  Current Tech:
                                </div>
                                <div style={{ fontSize: '13px', color: '#d1d5db' }}>
                                  {business.techStack}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px', fontWeight: '600' }}>
                                  Pain Points:
                                </div>
                                <div style={{ fontSize: '13px', color: '#fca5a5' }}>
                                  {business.painPoints}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Contact Info */}
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                          gap: '16px', 
                          marginBottom: '20px',
                          padding: '16px',
                          background: 'rgba(15, 15, 30, 0.4)',
                          borderRadius: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Mail size={18} color="#6366f1" />
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '2px' }}>Email</div>
                              <a 
                                href={`mailto:${business.email}`}
                                style={{ fontSize: '14px', fontWeight: '600', color: '#6366f1', textDecoration: 'none' }}
                              >
                                {business.email}
                              </a>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Phone size={18} color="#6366f1" />
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '2px' }}>Phone</div>
                              <a 
                                href={`tel:${business.phone}`}
                                style={{ fontSize: '14px', fontWeight: '600', color: '#6366f1', textDecoration: 'none' }}
                              >
                                {business.phone}
                              </a>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={18} color="#6366f1" />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '2px' }}>Address</div>
                              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{business.address}</div>
                              <button
                                onClick={() => openGoogleMaps(business.address)}
                                style={{
                                  padding: '4px 12px',
                                  background: 'rgba(66, 133, 244, 0.2)',
                                  border: '1px solid rgba(66, 133, 244, 0.4)',
                                  borderRadius: '5px',
                                  color: '#93b7f8',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(66, 133, 244, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(66, 133, 244, 0.2)';
                                }}
                              >
                                <MapPin size={12} />
                                View on Google Maps
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ExternalLink size={18} color="#6366f1" />
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '2px' }}>Website</div>
                              <a 
                                href={`https://${business.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ fontSize: '14px', fontWeight: '600', color: '#6366f1', textDecoration: 'none' }}
                              >
                                {business.website}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Contact Persons */}
                        {business.contacts && business.contacts.length > 0 && (
                          <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ 
                              fontSize: '15px', 
                              fontWeight: '700', 
                              marginBottom: '12px',
                              color: '#d1d5db',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <User size={16} />
                              Key Contacts ({business.contacts.length})
                            </h4>
                            <div style={{ display: 'grid', gap: '12px' }}>
                              {business.contacts.map((contact, idx) => (
                                <div key={idx} style={{
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  border: '1px solid rgba(99, 102, 241, 0.2)',
                                  borderRadius: '8px',
                                  padding: '12px 16px',
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                  gap: '12px',
                                  alignItems: 'center'
                                }}>
                                  <div>
                                    <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                                      {contact.name}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#a5b4fc' }}>
                                      {contact.role}
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Mail size={14} color="#9ca3af" />
                                    <a 
                                      href={`mailto:${contact.email}`}
                                      style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none' }}
                                    >
                                      {contact.email}
                                    </a>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Phone size={14} color="#9ca3af" />
                                    <a 
                                      href={`tel:${contact.phone}`}
                                      style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none' }}
                                    >
                                      {contact.phone}
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Social Media */}
                        {(business.linkedin || business.facebook) && (
                          <div style={{ 
                            display: 'flex', 
                            gap: '16px',
                            padding: '12px 16px',
                            background: 'rgba(15, 15, 30, 0.3)',
                            borderRadius: '8px'
                          }}>
                            {business.linkedin && (
                              <a 
                                href={`https://${business.linkedin}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  fontSize: '13px',
                                  color: '#0077b5',
                                  textDecoration: 'none',
                                  fontWeight: '600'
                                }}
                              >
                                <ExternalLink size={14} />
                                LinkedIn
                              </a>
                            )}
                            {business.facebook && (
                              <a 
                                href={`https://${business.facebook}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  fontSize: '13px',
                                  color: '#1877f2',
                                  textDecoration: 'none',
                                  fontWeight: '600'
                                }}
                              >
                                <ExternalLink size={14} />
                                Facebook
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tag Modal */}
      {showTagModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={() => setShowTagModal(false)}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Tag size={20} color="#6366f1" />
              Add Tag
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    addTagToBusiness(selectedBusinessForTag, tag);
                    setShowTagModal(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    borderRadius: '8px',
                    color: '#e8e8f0',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTagModal(false)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: 'rgba(30, 30, 45, 0.8)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '8px',
                color: '#9ca3af',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          overflowY: 'auto'
        }}
        onClick={() => setShowEmailModal(false)}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '700px',
            width: '100%',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Send size={20} color="#6366f1" />
              Compose Email to Selected Businesses
            </h3>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '24px' }}>
              Sending to {selectedBusinesses.size} business{selectedBusinesses.size > 1 ? 'es' : ''}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                Subject Line
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(15, 15, 30, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#e8e8f0',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#d1d5db' }}>
                Email Body
              </label>
              <textarea
                value={emailData.body}
                onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                rows={15}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(15, 15, 30, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#e8e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSendEmail}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)'
                }}
              >
                <Send size={16} />
                Open in Email Client
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(30, 30, 45, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
