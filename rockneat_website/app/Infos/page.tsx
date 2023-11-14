import Link from 'next/link';
import Image from 'next/image';
import GoogleMapView from './GoogleMapView';

export default async function InfosPage() {
    const address = '32 Quai Arloing, Lyon, France';

    return (
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">CONTACT</h1>
            <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
                <div className='flex flex-col w-4/5 m-auto sm:w-2/5 p-2 sm:mx-3 mb-2 sm:mb-0 bg-black/70'>
                    <h3 className='font-semibold'>Contact Groupe & Orga</h3>
                    <button className='text-center m-auto bg-gray-800 text-white font-semibold py-1 mt-2 px-4 border rounded border-transparent'>
                        <a href="mailto:booking@rockneat.com" target="_blank" className='flex flex-row justify-center'>
                            <Image
                                src="/mail.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                            />
                            <p>booking@rockneat.com</p>
                        </a>
                    </button>
                </div>
                <div className='flex flex-col w-4/5 m-auto p-2 sm:w-2/5 sm:mx-3 bg-black/70'>
                    <h3 className='font-semibold'>Autres demandes</h3>
                    <button className='text-center m-auto bg-gray-800 text-white font-semibold py-1 mt-2 pr-4 pl-3 border rounded border-transparent'>
                        <a href="https://www.facebook.com/profile.php?id=100064657305310" target="_blank" className='flex flex-row justify-center'>
                            <Image
                                src="/fb.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                            />
                            <p>facebook</p>
                        </a>
                    </button>
                </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">INFOS</h1>
            <div className='flex flex-col p-2 w-full bg-black/70 text-center mb-2'>
                <h3 className='font-semibold'>Horaires</h3>
                <p>Le Rock n&apos; Eat est ouvert les soirs suivant &eacute;v&eacute;nement de 16h00 a 4h00</p>
                    <button className='text-center m-auto bg-gray-800 text-white font-semibold py-1 mt-2 pr-4 pl-3 border rounded border-transparent'>
                        <Link href="/Programmation">
                            Programmation
                        </Link>
                    </button>
            </div>
            <div className='flex flex-col w-full sm:flex-row justify-between mb-2'>
                <div className='flex flex-col justify-start sm:w-[49%] p-2 mb-2 sm:mb-0 text-center sm:text-start bg-black/70'>
                    <h3 className='font-semibold'>Adresse</h3>
                    <p>32 Quai Arloing Lyon 9&egrave;me</p>
                    <h3 className='mt-1 font-semibold'>Transports</h3>
                    <p>
                        Bus 2, 19, 31, 45 et C14 arrêt Pont Koënig R.D.<br/>
                        Métro D arrêt Valmy<br/>
                        Parkings en face<br/>
                        Station V&eacute;lo&apos;V<br/>
                    </p>
                </div>
                <div className='w-full justify-end sm:w-[49%] p-2 bg-black/70'>
                    <GoogleMapView />
                </div>
            </div>
        </div>
    )
}