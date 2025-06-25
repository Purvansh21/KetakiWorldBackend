import { useState } from 'react';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  pan: '',
  panName: '',
  aadhaarPhoto: null,
  aadhaarNumber: '',
  gstCert: null,
  gstNumber: '',
  electricityBill: null,
};

const initialErrors = {
  name: '',
  phone: '',
  email: '',
  pan: '',
  panName: '',
  aadhaarPhoto: '',
  aadhaarNumber: '',
  gstCert: '',
  gstNumber: '',
  electricityBill: '',
  submit: '',
};

const Onboarding = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = { ...initialErrors };
    // Name
    if (!form.name.trim()) newErrors.name = 'Full Name is required.';
    // Phone
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
    // Email
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    // PAN
    if (!/^[A-Z0-9]{10}$/.test(form.pan)) newErrors.pan = 'Enter a valid 10-character PAN (uppercase, alphanumeric).';
    // Name on PAN
    if (!form.panName.trim()) newErrors.panName = 'Name on PAN Card is required.';
    // Aadhaar Photo
    if (!form.aadhaarPhoto) newErrors.aadhaarPhoto = 'Aadhaar Card Photo is required.';
    else if (!FILE_TYPES.includes(form.aadhaarPhoto.type)) newErrors.aadhaarPhoto = 'Only PDF/JPG/PNG allowed.';
    else if (form.aadhaarPhoto.size > MAX_FILE_SIZE) newErrors.aadhaarPhoto = 'File must be ≤ 25MB.';
    // Aadhaar Number
    if (!/^\d{12}$/.test(form.aadhaarNumber)) newErrors.aadhaarNumber = 'Enter a valid 12-digit Aadhaar number.';
    // GST Cert
    if (!form.gstCert) newErrors.gstCert = 'GST Certificate is required.';
    else if (!FILE_TYPES.includes(form.gstCert.type)) newErrors.gstCert = 'Only PDF/JPG/PNG allowed.';
    else if (form.gstCert.size > MAX_FILE_SIZE) newErrors.gstCert = 'File must be ≤ 25MB.';
    // GST Number
    if (!/^[A-Z0-9]{15}$/i.test(form.gstNumber)) newErrors.gstNumber = 'Enter a valid 15-character GSTIN.';
    // Electricity Bill
    if (!form.electricityBill) newErrors.electricityBill = 'Electricity Bill is required.';
    else if (!FILE_TYPES.includes(form.electricityBill.type)) newErrors.electricityBill = 'Only PDF/JPG/PNG allowed.';
    else if (form.electricityBill.size > MAX_FILE_SIZE) newErrors.electricityBill = 'File must be ≤ 25MB.';
    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === '');
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialErrors); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    if (!validate()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      formData.append('clerkEmail', user?.primaryEmailAddress?.emailAddress || '');
      // Get Clerk JWT using useAuth
      // Onboarding.tsx → handleSubmit
      const token = await getToken();
      const apiUrl = 'https://mypartnerketakiworld.onrender.com/api/onboarding';
      // POST to backend with Clerk JWT
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        // If backend sent Zod validation errors
        if (errorData.details && Array.isArray(errorData.details)) {
          const newErrors = { ...initialErrors };
          errorData.details.forEach((err) => {
            if (err.path && err.path[0] && newErrors[err.path[0]] !== undefined) {
              newErrors[err.path[0]] = err.message;
            }
          });
          setErrors((prev) => ({ ...prev, ...newErrors, submit: 'Please fix the highlighted errors.' }));
          setSubmitting(false);
          return;
        }
        // If backend sent a specific error
        if (errorData.error) {
          setErrors((prev) => ({ ...prev, submit: errorData.error }));
          setSubmitting(false);
          return;
        }
        throw new Error('Submission failed. Please try again.');
      }

      // Update Clerk metadata only after successful form submission to backend
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            onboardingComplete: true,
            // Be cautious about storing all form data directly in unsafeMetadata for sensitive fields.
            // It's better to store only a status here and sensitive data in your secure backend database.
            // For now, we'll keep it as is, but note this for production.
            // ...form,
          },
        });
      }

      setSuccessMessage('Onboarding successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds to show success message

    } catch (err) {
      console.error('Onboarding submission error:', err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || 'An unexpected error occurred. Please try again.'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
        <Logo size="small" />
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 w-full max-w-lg space-y-6" noValidate>
          <h1 className="text-2xl font-bold mb-4 text-partner-600">Complete Your Onboarding</h1>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required disabled={submitting} />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="tel" maxLength={10} disabled={submitting} />
              {errors.phone && <div className="text-red-600 text-sm">{errors.phone}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="email" disabled={submitting} />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">PAN Number</label>
              <input name="pan" value={form.pan} onChange={handleChange} className="w-full border rounded px-3 py-2 uppercase" required maxLength={10} disabled={submitting} />
              {errors.pan && <div className="text-red-600 text-sm">{errors.pan}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Name on PAN Card</label>
              <input name="panName" value={form.panName} onChange={handleChange} className="w-full border rounded px-3 py-2" required disabled={submitting} />
              {errors.panName && <div className="text-red-600 text-sm">{errors.panName}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Aadhaar Card Photo (PDF/JPG/PNG, ≤25MB)</label>
              <input name="aadhaarPhoto" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="w-full border rounded px-3 py-2" required disabled={submitting} />
              {errors.aadhaarPhoto && <div className="text-red-600 text-sm">{errors.aadhaarPhoto}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Aadhaar Number</label>
              <input name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" required maxLength={12} disabled={submitting} />
              {errors.aadhaarNumber && <div className="text-red-600 text-sm">{errors.aadhaarNumber}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">GST Certificate (PDF/JPG/PNG, ≤25MB)</label>
              <input name="gstCert" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="w-full border rounded px-3 py-2" required disabled={submitting} />
              {errors.gstCert && <div className="text-red-600 text-sm">{errors.gstCert}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">GST Number</label>
              <input name="gstNumber" value={form.gstNumber} onChange={handleChange} className="w-full border rounded px-3 py-2 uppercase" required maxLength={15} disabled={submitting} />
              {errors.gstNumber && <div className="text-red-600 text-sm">{errors.gstNumber}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Electricity Bill (PDF/JPG/PNG, ≤25MB, recent)</label>
              <input name="electricityBill" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="w-full border rounded px-3 py-2" required disabled={submitting} />
              {errors.electricityBill && <div className="text-red-600 text-sm">{errors.electricityBill}</div>}
            </div>
            {submitting && (
              <div className="text-center text-blue-600 text-sm mt-4">
                Submitting your documents... Please wait, this may take a moment.
              </div>
            )}
            {successMessage && (
              <div className="text-center text-green-600 text-md mt-4 font-semibold">
                {successMessage}
              </div>
            )}
            {errors.submit && <div className="text-red-600 text-sm text-center">{errors.submit}</div>}
            <Button type="submit" className="w-full" disabled={submitting || !!successMessage}>
              {submitting ? 'Submitting...' : 'Submit & Continue'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Onboarding; 
