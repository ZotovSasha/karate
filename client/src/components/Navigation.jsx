import { Link } from 'react-router-dom'
import { GiKarateUniform } from 'react-icons/gi'

export default function Navigation() {
    return (
        <nav className="bg-dojo-dark border-b-4 border-dojo-red">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center flex-1">
                        <GiKarateUniform className="w-8 h-8 text-dojo-red mr-2" />
                        <span className="text-dojo-sand font-heading text-xl tracking-wide">
              KARATE CHAMPIONSHIP
            </span>
                        <div className="hidden md:block ml-12">
                            <div className="flex space-x-8">
                                <Link
                                    to="/"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/participants"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Participants
                                </Link>
                                <Link
                                    to="/judges"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Judges
                                </Link>
                                <Link
                                    to="/judging-teams"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Teams
                                </Link>
                                <Link
                                    to="/stats"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Statistics
                                </Link>
                                <Link
                                    to="/assignments"
                                    className="text-dojo-sand hover:text-dojo-red font-body flex items-center px-3 py-2
                    border-b-2 border-transparent hover:border-dojo-red transition-all duration-300"
                                >
                                    Assignments
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}