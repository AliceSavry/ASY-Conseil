import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Les champs nom, email et message sont requis" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    // For now, we'll simulate a successful submission
    console.log("📧 Nouvelle demande de contact reçue:");
    console.log("━".repeat(50));
    console.log(`👤 Nom: ${body.name}`);
    console.log(`📧 Email: ${body.email}`);
    console.log(`🏢 Entreprise: ${body.company || "Non spécifié"}`);
    console.log(`📱 Téléphone: ${body.phone || "Non spécifié"}`);
    console.log(`💬 Message: ${body.message}`);
    console.log("━".repeat(50));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true, 
        message: "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais." 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "API de contact ASY Conseil - Utilisez POST pour envoyer un message" },
    { status: 200 }
  );
}
