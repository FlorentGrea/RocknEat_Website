import GoogleMapView from './Infos Components/GoogleMapView';
import InfosAdmin from './Infos Components/InfosAdmin';
import { getSession } from '@auth0/nextjs-auth0';
import PocketBase from 'pocketbase';
import Image from 'next/image';
import Link from 'next/link';

export default async function InfosPage() {  
    const pb = new PocketBase(process.env.DB_ADDR);
    const record = await pb.collection('Jsons').getOne('fw6lepz7dvc188d', { cache: 'no-store'})
    const Infos = JSON.parse(JSON.stringify(record.json_file))
    const session = await getSession();
    const user = session?.user;

    { user ? (
        <InfosAdmin data={Infos} htmlName='Slogan' />
      ):(
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">{Infos.Slogan}</h1>
    )}
    return (
        <div className='flex flex-col items-center mt-4 sm:mt-6 md:mt-8 lg:mt-14'>
            <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
                <div className='flex flex-col w-4/5 m-auto sm:w-2/5 p-2 sm:mx-3 mb-2 sm:mb-0 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 animate-slide-bottom-d1'>
                    <h3 className='text-sm lg:text-base xl:text-lg font-bold'>Contact Groupe & Orga</h3>
                    { user ? (
                        <InfosAdmin data={Infos} htmlName='Mail' />
                      ):(
                        <button className="w-fit text-xs lg:text-sm xl:text-base m-auto bg-red px-3 py-1 my-1 shadow-sm shadow-white/30">
                            <a href={"mailto:" + Infos.Mail} target="_blank" className='flex flex-row justify-center'>
                                <Image
                                    src="/mail.svg"
                                    width={40}
                                    height={40}
                                    alt="Mail"
                                    className="object-contain h-5 w-5 mr-1 mt-1 filter-white pt-1"
                                />
                                <p>{Infos.Mail}</p>
                            </a>
                        </button>
                    )}
                </div>
                <div className='flex flex-col w-4/5 m-auto p-2 sm:w-2/5 sm:mx-3 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 animate-slide-bottom-d2'>
                    <h3 className='text-sm lg:text-base xl:text-lg font-bold'>Autres demandes</h3>
                    { user ? (
                        <InfosAdmin data={Infos} htmlName='Facebook' />
                      ):(
                        <button className="w-fit text-xs lg:text-sm xl:text-base m-auto bg-red px-3 py-1 my-1 shadow-sm shadow-white/30">
                            <a href={Infos.Facebook} target="_blank" className='flex flex-row justify-center'>
                                <Image
                                    src="/fb.svg"
                                    width={40}
                                    height={40}
                                    alt="Mail"
                                    className="object-contain h-5 w-5 mr-1 mt-1 filter-white pt-1"
                                />
                                <p>facebook</p>
                            </a>
                        </button>
                    )}
                </div>
            </div>
            <div className='flex flex-col p-2 w-full mt-4 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 text-center mb-2 animate-slide-bottom-d3'>
                <h3 className='text-sm lg:text-base xl:text-lg font-bold'>Horaires</h3>
                { user ? (
                    <InfosAdmin data={Infos} htmlName='Horaires' />
                  ):(
                    <p className='text-xs lg:text-sm xl:text-base'>{Infos.Horaires}</p>
                )}
                <button className="m-auto text-center text-xs lg:text-sm xl:text-base bg-red px-3 py-1 my-1 shadow-sm shadow-white/30">
                    <Link href="/Programmation">
                        Programmation
                    </Link>
                </button>
            </div>
            <div className='flex flex-col w-full sm:flex-row justify-between mb-2'>
                { user ? (
                    <div className='flex flex-col justify-start sm:w-[49%] p-2 mb-2 sm:mb-0 text-center sm:text-start bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 animate-slide-bottom-d4'>
                        <h3 className='text-xs lg:text-sm xl:text-base font-semibold'>Adresse</h3>
                        <InfosAdmin data={Infos} htmlName='Adresse' />
                        <h3 className='mt-1 text-xs lg:text-sm xl:text-base font-semibold'>Transports</h3>
                        <InfosAdmin data={Infos} htmlName='Bus' />
                        <InfosAdmin data={Infos} htmlName='Metro' />
                        <InfosAdmin data={Infos} htmlName='Parking' />
                        <InfosAdmin data={Infos} htmlName='Velo' />
                    </div>
                  ):(
                    <div className='flex flex-col text-xs lg:text-sm xl:text-base justify-start sm:w-[49%] p-2 mb-2 sm:mb-0 text-center sm:text-start bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 animate-slide-bottom-d4'>
                        <h3 className='font-semibold'>Adresse</h3>
                        <p>{Infos.Adresse}</p>
                        <h3 className='mt-1 font-semibold'>Transports</h3>
                        <p>{Infos.Bus}</p>
                        <p>{Infos.Metro}</p>
                        <p>{Infos.Parking}</p>
                        <p>{Infos.Velo}</p>
                    </div>
                )}
                <div className='w-full justify-end sm:w-[49%] p-2 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 animate-slide-bottom-d5'>
                    { user ? (
                        <InfosAdmin data={Infos} htmlName='Map' />
                      ):(
                        <GoogleMapView Infos={Infos} />
                    )}
                </div>
            </div>
        </div>
    )
}