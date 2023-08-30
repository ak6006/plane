import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react-lite";
// components
import IssueNavbar from "components/issues/navbar";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-screen min-h-[500px] h-screen overflow-hidden flex flex-col">
    <div className="flex-shrink-0 h-[60px] border-b border-gray-300 relative flex items-center bg-white select-none">
      <IssueNavbar />
    </div>
    <div className="w-full h-full relative bg-gray-100/50 overflow-hidden">{children}</div>
    <div className="absolute z-[99999] bottom-[10px] right-[10px] bg-white rounded-sm shadow-lg border border-gray-100">
      <Link href="https://plane.so">
        <a className="p-1 px-2 flex items-center gap-1" target="_blank">
          <div className="w-[24px] h-[24px] relative flex justify-center items-center">
            <Image src="/plane-logo.webp" alt="plane logo" className="w-[24px] h-[24px]" height="24" width="24" />
          </div>
          <div className="text-xs">
            Powered by <b>Plane Deploy</b>
          </div>
        </a>
      </Link>
    </div>
  </div>
);

export default observer(ProjectLayout);