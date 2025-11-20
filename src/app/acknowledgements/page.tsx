import { Heart, Code, Users, Star, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AcknowledgementsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Heart className="mr-3 h-10 w-10 text-primary" />
          Acknowledgements
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Recognizing the people and teams who made this platform possible.
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardContent className="p-8 space-y-10">
          {/* Association */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="mr-3 h-6 w-6 text-primary" />
              University of Toronto Chinese Students and Scholars Association
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This member management system was developed to serve the University of Toronto Chinese Students and Scholars Association (UTCSSA) and its community members.
            </p>
          </section>

          {/* Development Team */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Code className="mr-3 h-6 w-6 text-primary" />
              Development Team
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-700 mb-4 leading-relaxed">
                This member management system was designed and developed by{" "}
                <a 
                  href="https://github.com/Peter-Hu12138" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline inline-flex items-center"
                >
                  Jingtian Hu <Github className="ml-1 h-3 w-3" />
                </a>
                , who served as the Lead Developer. The development process involved analyzing the association's requirements, designing the database structure, implementing the web application features, and ensuring the system meets the needs of UTCSSA members and administrators.
              </p>
              
              <div className="space-y-2">
                <p className="font-medium text-gray-900">We also acknowledge the valuable contributions from:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <a href="https://github.com/sduoduo233" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline inline-flex items-center mr-1">
                      Chengrui Song <Github className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400 text-sm ml-1">(Deployment Engineer)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <a href="https://github.com/C20H12" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline inline-flex items-center mr-1">
                      Luhan Ma <Github className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400 text-sm ml-1">(Frontend Designer)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <a href="https://github.com/QwQ1231043" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline inline-flex items-center mr-1">
                      Zhengdong Yao <Github className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400 text-sm ml-1">(Early Development Support)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Special Thanks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Star className="mr-3 h-6 w-6 text-primary" />
              Special Thanks
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <h3 className="font-bold text-yellow-800 mb-2">UTCSSA Executive Team</h3>
                <p className="text-sm text-yellow-700">For providing requirements, feedback, and continuous support throughout the development process.</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <h3 className="font-bold text-yellow-800 mb-2">Beta Testers</h3>
                <p className="text-sm text-yellow-700">UTCSSA members who helped test and improve the system functionality.</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <h3 className="font-bold text-yellow-800 mb-2">Open Source Community</h3>
                <p className="text-sm text-yellow-700">For providing the tools and libraries that made this project possible.</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
