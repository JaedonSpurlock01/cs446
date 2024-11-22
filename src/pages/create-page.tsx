import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const user = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    linkedin: "",
    email: "",
    phone: "",
  });

  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    const fetchQRCode = async () => {
      const qrCodeImageUrl = await getQRCodeUrl();
      if (qrCodeImageUrl) {
        setQrCode(qrCodeImageUrl);
      }
    };
    fetchQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const generateVCardData = () => {
    return `BEGIN:VCARD
  VERSION:3.0
  FN:${formData.name}
  NOTE:${formData.bio}
  URL:${formData.linkedin}
  EMAIL:${formData.email}
  TEL:${formData.phone}
  END:VCARD`;
  };

  // Generate QR code URL using the quickchart API
  const getQRCodeUrl = async () => {
    const data = encodeURIComponent(generateVCardData());
    const qrCodeUrl = `https://quickchart.io/qr?text=${data}`;

    try {
      const fetchResponse = await fetch(qrCodeUrl);

      if (fetchResponse.ok) {
        // Convert the response to a blob (image)
        const blob = await fetchResponse.blob();
        // Create an object URL from the blob
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        return imageUrl; // You can return this URL to be used in an <img> tag
      } else {
        console.error("Failed to fetch QR code image.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching the QR code:", error);
      return null;
    }
  };
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user.isSignedIn) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-2xl font-semibold tracking-tighter text-neutral-800">
          You must be signed in to create a profile
        </p>
        <Button className="bg-blue-400 text-white hover:bg-blue-500">
          <SignInButton mode="modal" />
        </Button>
        <Button
          className="bg-white text-blue-500 hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </section>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto p-4">
      {/* Form Section */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Portfolio Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a brief description about yourself"
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </CardContent>
      </Card>

      {/* QR Code Preview Section */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>QR Code Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
          <img
            src={qrCode}
            alt="QR Code"
            className="border rounded-lg shadow-lg"
          />
          <p className="mt-4 text-sm text-gray-500">
            Scan to add contact information
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
