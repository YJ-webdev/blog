export default function About() {
  return (
    <div className="mt-10 mb-20">
      <section className="max-w-[750px] mx-auto dark:text-muted-foreground">
        <p className="py-5">
          레인지 저널에 오신 것을 환영합니다 –
          <span className="italic font-light">탁월함을 향한 여정</span>
        </p>
        <p>
          레인지 저널의 목표는 독자들에게 지식과 창의성, 혁신을 통해 영감을 주는
          것입니다. 모든 콘텐츠는 신뢰할 수 있는 정보와 깊이 있는 분석을
          제공하며, 여러분의 삶에 긍정적인 영향을 미칠 수 있기를 바랍니다.
        </p>
        <h2 className="section-heading">찾아볼 수 있는 콘텐츠</h2>
        <p>
          레인지 저널에서는 여행, 경제, 건강, DIY 등 다양한 분야의 콘텐츠를
          만나실 수 있습니다. 각 주제는 정확하고 신뢰성 있는 정보로 제공되며,
          새로운 관점을 제시합니다.
        </p>
        <ul className="pt-5 pb-2 list-disc pl-5 space-y-3">
          <li>여행: 숨겨진 보석 같은 여행지를 소개합니다.</li>
          <li>경제 & 트렌드: 세계 경제의 변화를 심도 있게 분석합니다.</li>
          <li>
            건강 & 웰빙: 피트니스, 정신 건강, 영양 등 삶의 질을 향상시키는 팁을
            제공합니다.
          </li>
          <li>
            DIY & 창의성: 창의적인 프로젝트와 지속 가능한 생활 팁을 다룹니다.
          </li>
          <li>
            라이프스타일 & 개인 성장: 생산성 팁과 자기 개발 전략을 공유합니다.
          </li>
        </ul>
        <h2 className="section-heading">우리의 여정에 함께하세요</h2>
        <p>
          레인지 저널는 이제 시작입니다. 세상은 배울 기회, 성장할 기회로 가득 차
          있습니다. 우리는 여러분이 그 여정을 함께할 수 있도록 돕고자 합니다.
          여행에 대한 갈망을 불태우고, 세상을 이해하고, 건강한 삶을 살고자
          한다면, 레인지 저널에서 모든 것을 찾을 수 있습니다.
        </p>

        <h2 className="section-heading">저작권</h2>
        <p>
          모든 사진은 Unsplash에서 제공된 이미지입니다. 각 사진의 저작권은 해당
          작가에게 귀속됩니다. 이 사이트는 개인 블로그로, 포스팅은 사실에
          근거하여 작성되었습니다.{' '}
        </p>
      </section>
    </div>
  );
}
