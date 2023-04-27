import React from 'react';

import SidebarSection from '../SidebarSection.js';

import GifSlider from '../GifSlider.js';
import coronalGif from '../../assets/Amygdala_coronal_sections_original.gif';
import sagittalGif from '../../assets/Amygdala_sagittal_sections.gif';
import transversalGif from '../../assets/Amygdala_transversal_sections.gif'


const conditions = [
    // 'Addiction',
    'Anxiety',
    // 'Autism spectrum disorder',
    // 'Bipolar disorder',
    'Chronic orofacial pain',
    // 'Chronic pain, spinal',
    // 'Major depressive disorder',
    // 'Social anxiety disorder',
    // 'Stress disorders',
];

const functions = [
    // 'Appetite and food intake',
    // 'Attention and vigilance',
    // 'Emotional processing',
    // 'Memory modulation',
    // 'Olfactory processing',
    // 'Pain processing',
    // 'Reward and reinforcement learning',
    // 'Sexual and social behavior',
    // 'Social cognition',
    // 'Stress response',
];

function NeuralRegionContent(props) {

    const mapToLinks = (items) => {
        return items.map((item, i) => {
            return (
                <div key={i}>
                    <span className="sidebar-link" onClick={props.navigateToNode} aria-label={item}>{item}</span>
                    <br/>
                </div>
            );
        })
    }

    return (
        <>
            <div
                className='content-header'>{props.header.toLowerCase().includes('artery') ? '🫀 Arterial Supply' : '🧠 Neural Region'}<i
                style={{fontSize: 12, marginLeft: 12, fontWeight: "normal"}}>Beta</i></div>
            <div className='content-body'>{props.header || 'TBD'}</div>
            <div className='sidebar-body'>
                <SidebarSection title='Parents'
                                description={props.content.parents.length > 0 ? mapToLinks(props.content.parents) : 'None specified'}
                                defaultIsOpen={true}
                                style={{paddingTop: 0}}
                />
                <SidebarSection title='Children'
                                description={props.content.children.length > 0 ? mapToLinks(props.content.children) : 'None specified'}
                                defaultIsOpen={true}/>
                <SidebarSection
                    title={props.header.toLowerCase().includes('artery') ? 'Neural Regions' : 'Arterial Supply'}
                    description={props.content.arterialSupply.length > 0 ? mapToLinks(props.content.arterialSupply) : 'None specified'}
                    defaultIsOpen={true}/>
                {/*<SidebarSection title='Location' defaultIsOpen={true} style={{}}*/}
                {/*                description={props.header === 'Amygdala'*/}
                {/*                    ? (*/}
                {/*                        <div style={{*/}
                {/*                            display: 'flex',*/}
                {/*                            flexWrap: 'wrap',*/}
                {/*                            // justifyContent: 'space-between',*/}
                {/*                            width: '100%',*/}
                {/*                            padding: 6*/}
                {/*                        }}>*/}
                {/*                            <GifSlider*/}
                {/*                                gifUrl={'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmEyMThjMGY4N2ZiMTU4ZjU4MzljODYwYWZlY2VlYjdhZGFmMmNjYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/1mR9NiVl4Oj2rk5cxM/giphy.gif'}*/}
                {/*                                idx={120}*/}
                {/*                                alt={'Coronal images'}*/}
                {/*                            />*/}
                {/*                            <GifSlider*/}
                {/*                                gifUrl={'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmM2YTgxZWJhMWEwNGFkNWQyZTgzMTAwNWFlZjQ2ODNlYzAzNjZkZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/90Ja4zNHcFCt6FZVlp/giphy.gif'}*/}
                {/*                                idx={157}*/}
                {/*                                alt={'Sagittal images'}*/}
                {/*                                gifStyle={{marginTop: 18}}*/}
                {/*                                sliderStyles={{marginTop: 19}}*/}
                {/*                            />*/}
                {/*                            <GifSlider*/}
                {/*                                gifUrl={'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjc3N2ViYTM4Y2ZkNzgwOWZlZWQ0MTJmNzRmNjZkNDYxMWY3MWM4NSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/rJcXxwpFLszqfHICyM/giphy.gif'}*/}
                {/*                                idx={160}*/}
                {/*                                alt={'Transversal images'}*/}
                {/*                                gifStyle={{marginTop: 18 }}*/}
                {/*                            />*/}
                {/*                        </div>*/}
                {/*                    ) : null}*/}
                {/*/>*/}
                <SidebarSection title='Cell Types'
                                description={props.header === 'Primary motor cortex' ? props.content.cellTypes : null}
                                defaultIsOpen={true}
                                style={props.header === 'Primary motor cortex' ? {height: 593} : {}}/>
                {/*<SidebarSection title='Functions'*/}
                {/*                description={props.header === 'Amygdala' ? mapToLinks(functions) : null}*/}
                {/*                defaultIsOpen={true}/>*/}
                <SidebarSection title='Conditions'
                                description={props.header === 'Amygdala' ? mapToLinks(conditions) : null}
                                defaultIsOpen={true} style={{marginBottom: 65}}/>
                {/*<SidebarSection title='Gene Expression' description={props.content && props.content.geneExpression || 'TBD'} defaultIsOpen={true}/>*/}
                {/*<SidebarSection title='Receptor Expression' description={props.content && props.content.receptorExpression || 'TBD'} defaultIsOpen={true}/>*/}
                {/*<SidebarSection title='Neurotransmitter Expression' description={props.content && props.neurotransmitterExpression || 'TBD'} defaultIsOpen={true}/>*/}
            </div>
        </>
    );
}

export default NeuralRegionContent;
