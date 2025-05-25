export default function Dashboard() {
    return (
        <div className="min-h-screen bg-dojo-sand">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-heading text-dojo-dark mb-8 border-l-4 border-dojo-red pl-4">
                    Tournament Dashboard
                </h1>

                <div className="bg-white rounded-lg shadow-2xl p-8 border-t-4 border-dojo-red">
                    <div className="text-center py-12">
                        <div className="mb-6 text-dojo-dark font-body text-xl">
                            <span className="text-dojo-red font-bold">KARATE</span> CHAMPIONSHIP MANAGEMENT SYSTEM
                        </div>
                        <p className="text-gray-600 italic">
                            "The ultimate victory is victory over oneself" - Unknown Sensei
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <div className="bg-dojo-dark p-6 rounded-lg text-dojo-sand">
                            <h3 className="font-heading text-lg mb-4">Participants</h3>
                            <p className="text-3xl font-bold text-dojo-red">0</p>
                            <p className="text-sm mt-2">Registered Fighters</p>
                        </div>

                        <div className="bg-dojo-dark p-6 rounded-lg text-dojo-sand">
                            <h3 className="font-heading text-lg mb-4">Judges</h3>
                            <p className="text-3xl font-bold text-dojo-red">0</p>
                            <p className="text-sm mt-2">Certified Officials</p>
                        </div>

                        <div className="bg-dojo-dark p-6 rounded-lg text-dojo-sand">
                            <h3 className="font-heading text-lg mb-4">Teams</h3>
                            <p className="text-3xl font-bold text-dojo-red">0</p>
                            <p className="text-sm mt-2">Judging Squads</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}