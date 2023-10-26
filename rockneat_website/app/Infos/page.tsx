import Link from 'next/link';
import GoogleMapView from '../components/client components/GoogleMapView';

export default async function InfosPage() {
    const address = '32 Quai Arloing, Lyon, France';

    return (
        <div className='flex flex-col m-auto'>
            <div className='flex flex-col text-center'>
                <h2>Contact</h2>
                <div className='flex flex-col sm:flex-row justify-center'>
                    <div className='flex flex-col sm:w-2/5 sm:mx-3'>
                        <h3>Contact GROUPE & ORGA</h3>
                        <p>
                            booking@rockneat.com
                        </p>
                    </div>
                    <div className='flex flex-col sm:w-2/5 sm:mx-3'>
                        <h3>Autres demandes</h3>
                        <a href="https://www.facebook.com/profile.php?id=100064657305310" target="_blank">Facebook</a>
                    </div>
                </div>
            </div>
            <div className='flex flex-col text-center'>
                <h2>Infos</h2>
                <p>horaires: Le Rock n&apos; Eat est ouvert les soirs suivant &eacute;v&eacute;nement de 16h00 a 4h00</p>
                <Link href="/">
                    (Voir la programmation compl&egrave;te)
                </Link>
            </div>
            <div className='flex flex-col sm:flex-row justify-center'>
                <div className='flex flex-col sm:w-2/5 sm:mx-3'>
                    <p>Adresse: 32 Quai Arloing Lyon 9&egrave;me</p>
                    <h2>Pour venir</h2>
                    <p>
                        Bus 2, 19, 31, 45 et C14 arrêt Pont Koënig R.D.<br/>
                        Métro D arrêt Valmy<br/>
                        Parkings en face<br/>
                        Station V&eacute;lo&apos;V<br/>
                    </p>
                </div>
                <div className='w-full sm:w-2/5 sm:mx-3'>
                    <GoogleMapView />
                </div>
            </div>
        </div>
    )
}