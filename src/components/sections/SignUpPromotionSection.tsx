import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/ui/auth-dialog";

export const SignUpPromotionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-wonder-50 to-partner-50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Ready to grow your travel business?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join Wonder Holidays and unlock exclusive B2B travel deals, tools, and support.
          </p>
          <AuthDialog>
            <Button className="bg-partner-500 hover:bg-partner-600 text-white text-lg py-4 px-10 rounded-xl shadow-lg shadow-partner-500/20 flex gap-2 items-center mx-auto">
              Become a Partner
            </Button>
          </AuthDialog>
        </div>
      </div>
    </section>
  );
};

export default SignUpPromotionSection;
