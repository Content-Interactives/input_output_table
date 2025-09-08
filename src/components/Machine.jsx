import './Machine.css'

const Machine = ({rule, step, lightType, currentOutput, spitAnimation, currentInput, inputSpitAnimation}) => {
    // Determine CSS class based on step
    const stepClass = step === 0 ? 'stepOne' : step === 1 ? 'stepTwo' : 'stepThree';
    
    // Determine spit animation class based on step
    const spitClass = spitAnimation ? 
        (step === 0 ? 'spit-animation-step-one' : 
         step === 1 ? 'spit-animation-step-two' : 
         'spit-animation-step-three') : '';

    // Determine input spit animation class based on step
    const inputSpitClass = inputSpitAnimation ? 
        (step === 0 ? 'input-spit-animation-step-one' : 
         step === 1 ? 'input-spit-animation-step-two' : 
         'input-spit-animation-step-three') : '';
    
    return(
        <div className='flex flex-col h-[100%] flex-grow items-center z-2'>
                <div className='mb-2'>
                        Rule
                </div>
                {/* Top Decorations */}
                <div className='relative w-[60%] flex items-center z-1'>
                    {/* Gear */}
                    <div className={`absolute translate-y-[5px] w-8 h-8 flex items-center justify-center gear-spin`} key={step}>
                        {/* Gear teeth */}
                        <div className="absolute inset-0">
                            {/* Top tooth */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-500" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Top-right tooth */}
                            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-gray-500 transform rotate-45" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Right tooth */}
                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-gray-500 rotate-90" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Bottom-right tooth */}
                            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-gray-500 transform rotate-[135deg]" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Bottom tooth */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 rotate-180" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Bottom-left tooth */}
                            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-gray-500 transform rotate-[225deg]" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Left tooth */}
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-gray-500 rotate-[270deg]" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                            {/* Top-left tooth */}
                            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-gray-500 transform rotate-[315deg]" 
                                 style={{clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)'}}></div>
                        </div>
                        {/* Main gear body */}
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                    {/* Lights */}
                    <div className='flex gap-2 ml-auto'>
                        {/* Wrong Answer Light */}
                        <div className={`w-[10px] h-[10px] border border-gray-500 border-1 border-b-0 rounded-t-full ${
                            lightType === 'wrong' ? 'bg-red-500 shadow-lg shadow-red-500/50' : ''
                        }`}/>
                        {/* Correct Answer Light */}
                        <div className={`w-[10px] h-[10px] border border-gray-500 border-1 border-b-0 rounded-t-full ${
                            lightType === 'correct' ? 'bg-green-500 shadow-lg shadow-green-500/50' : ''
                        }`}/>
                    </div>
                </div>
                {/* Top Slab */}
                <div className='relative w-[70%] h-[10px] bg-gray-700 rounded-bl-lg rounded-br-lg z-2'/>
                    {/* Middle of Machine */}
                    <div className='w-[80%] h-[100%] flex items-center justify-center z-2'>
                        {/* Left Funnel */}
                        <div className='relative'>
                            {/* Input Spit In - placed first so it renders behind */}
                            <div className={`absolute top-0 pt-3 ${stepClass} ${inputSpitClass}`} style={{ zIndex: 1 }}>
                                {currentInput}
                            </div>
                            {/* Funnel - placed second so it renders in front */}
                            <div className={`bg-yellow-500 h-[50px] w-[20px] flex items-center justify-center ${stepClass}`} style={{clipPath: 'polygon(0% 0%, 100% 25%, 100% 75%, 0% 100%)', zIndex: 2, position: 'relative'}} />
                        </div>
                        {/* Gray Body */}
                        <div className='flex-grow bg-gray-500 h-[100%] flex items-center justify-center z-0'>
                                {/* Rule */}
                                <div className={`text-center font-bold text-sm bg-white py-2 px-1 flex items-center justify-center border border-yellow-600 rounded-md z-10 ${stepClass}`}>{rule}</div>
                                {/* Indent */}
                                <div className='absolute bg-gray-600 h-[30%] w-[10px] rounded-lg z-1'/>
                        </div>
                        {/* Right Funnel */}
                        <div className='relative'>
                            {/* Output Spit Out - placed first so it renders behind */}
                            <div className={`absolute top-0 pt-3 ${stepClass} ${spitClass}`} style={{ zIndex: 1 }}>
                                {currentOutput}
                            </div>
                            {/* Funnel - placed second so it renders in front */}
                            <div className={`bg-yellow-500 h-[50px] w-[20px] flex items-center justify-center ${stepClass}`} style={{clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 75%)', zIndex: 2, position: 'relative'}} />
                        </div>
                    </div>
                {/* Bottom Slab */}
                <div className='w-[70%] h-[10px] bg-gray-700 rounded-tl-lg rounded-tr-lg'/>
        </div>
    )
}

export default Machine;