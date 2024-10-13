import { useEffect } from "react";

function Overview() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-right-5 ease-out">
      <h1>What are &quot;hallucinations&quot; in AI?</h1>

      <h2>Definition</h2>
      <p>
        In the context of generative AI, hallucinations refer to instances where
        an AI model generates outputs that are either factually incorrect,
        nonsensical, or not grounded in reality. For example, in natural
        language models like GPT, a hallucination might be a fabricated fact or
        citation. In computer vision, it might be the identification of
        nonexistent objects in images (Thinking Stack, n.d.)(Antonio, n.d.).
        Hallucinations pose a significant challenge, especially when AI systems
        are used in critical domains like healthcare, finance, or autonomous
        driving.
      </p>

      <h2>Types of AI Hallucinations</h2>
      <p>Hallucinations can occur in various forms of AI:</p>
      <ul>
        <li>
          <strong>Text-based AI:</strong> A language model might generate
          sentences that sound reasonable but are factually wrong.
        </li>
        <li>
          <strong>Image-based AI:</strong> An image generator could produce
          visual artifacts that don’t exist in reality, such as extra limbs on a
          person.
        </li>
      </ul>

      <h2>Why Hallucinations Happen</h2>
      <p>There are several key reasons why AI hallucinations happen:</p>
      <ul>
        <li>
          <strong>Data-Related Issues:</strong> Poor-quality, biased, or
          incomplete training data can lead AI to generate unreliable outputs.
          If the model is trained on data that doesn’t represent real-world
          diversity or accuracy, it may hallucinate by producing results that
          reflect the biases or gaps in its training{" "}
          <em>(Thinking Stack, n.d.)</em>, <em>(Antonio, n.d.)</em>.
        </li>
        <li>
          <strong>Model Overfitting or Underfitting:</strong> Overfitting occurs
          when the AI learns the noise in the training data too well, generating
          hallucinations based on patterns that don’t actually exist.
          Underfitting, on the other hand, can make the model miss key patterns,
          also leading to incorrect outputs <em>(Thinking Stack, n.d.)</em>.
        </li>
        <li>
          <strong>Algorithmic Challenges:</strong> Many models, especially large
          language models (LLMs), struggle with understanding context or
          disambiguating meanings, leading to outputs that don’t align with the
          input or real-world facts. This is often due to the probabilistic
          nature of text generation <em>(Lucy, 2024)</em>.
        </li>
        <li>
          <strong>Adversarial Attacks:</strong> Malicious actors can subtly
          alter input data to deliberately confuse AI models, causing them to
          hallucinate <em>(Antonio, n.d.)</em>.
        </li>
      </ul>

      <h2>Measures to Prevent Hallucinations</h2>
      <p>
        Preventing AI hallucinations requires a combination of strategies aimed
        at improving the quality of data, refining model architectures, and
        increasing human oversight:
      </p>
      <ul>
        <li>
          <strong>Data Quality and Diversity:</strong> Ensuring the AI is
          trained on high-quality, representative, and unbiased data is crucial.
          Techniques like data augmentation and domain adaptation can help
          improve the robustness of the training dataset{" "}
          <em>(Antonio, n.d.)</em>.
        </li>
        <li>
          <strong>Prompt Engineering:</strong> Providing clear, explicit
          instructions in prompts can help reduce hallucinations. Methods like
          chain-of-thought prompting (breaking down tasks step by step) can also
          encourage more accurate reasoning <em>(Lucy, 2024)</em>.
        </li>
        <li>
          <strong>Human-in-the-Loop Systems:</strong> Incorporating human
          oversight can catch and correct hallucinations before they reach
          end-users. This is particularly important in high-stakes applications{" "}
          <em>(Thinking Stack, n.d.)</em>.
        </li>
        <li>
          <strong>Retrieval-Augmented Generation (RAG):</strong> Using external
          knowledge sources during generation helps ground the AI’s responses in
          factual data, reducing the risk of hallucination{" "}
          <em>(Antonio, n.d.)</em>.
        </li>
        <li>
          <strong>Regular Evaluation and Fine-Tuning:</strong> Continuous
          monitoring, testing, and fine-tuning of AI models is essential for
          maintaining accuracy, especially as new data becomes available or
          tasks evolve <em>(Antonio, n.d.)</em>.
        </li>
      </ul>
      <p>
        By combining these strategies, organizations can mitigate the risk of
        hallucinations in generative AI models and improve the reliability of
        their outputs.
      </p>

      <h2>
        Types of LLMs, Image Generative, and Video Generative Models Relating to
        Editability
      </h2>
      <p>
        Generative AI spans across several domains, from LLMs for text
        generation to models that produce images or videos. LLMs like GPT-4 or
        similar models can generate coherent text by learning patterns from vast
        datasets. In terms of editability, some models allow iterative
        fine-tuning, enabling adjustments to the output through prompt
        engineering or additional training based on user needs. For image
        generation, models like DALL-E or Stable Diffusion offer detailed
        controls for tweaking outputs, such as adjusting color schemes or
        reinterpreting the same prompt. Recent advancements in video generation
        models, such as text-to-3D or text-to-video models, have introduced
        compositional generation frameworks that allow explicit control over
        objects, scenes, and animations, refining visual outputs with multi-step
        guidance.
      </p>
      <p>
        For example, LLMs decompose textual prompts into concepts (scenes,
        objects, motions), which are then processed individually. This
        decomposition helps in refining specific elements like object size,
        scale, and trajectory, contributing to the flexibility and editability
        of the outputs. These generative models often rely on diffusion-based
        techniques, offering fine-grained adjustments to spatial or temporal
        properties of the generated content (Pengyuan Zhou,n.d.).
      </p>

      <h2>Editable Features in AI Models</h2>
      <p>
        In terms of editable features, AI models have evolved to support various
        levels of user input and control. For LLMs, users can guide outputs by
        specifying desired styles, tones, or formats, while fine-tuning allows
        more in-depth adjustments by retraining models with specific datasets.
        Image generative models like Stable Diffusion provide high editability,
        enabling users to change various aspects of an image, such as lighting
        or object positioning, post-generation. Similarly, video generation
        models integrate editability through compositional features—users can
        modify individual elements of a generated video, such as the trajectory
        of an object or the setting of a scene, refining it over multiple
        iterations.
      </p>
      <p>
        3D models often offer enhanced editability due to their explicit spatial
        representation, allowing for the adjustment of specific objects within a
        scene, including their motion, size, or placement. This editability is
        crucial for applications in video and game development, where precise
        control over elements is necessary (Pengyuan Zhou,n.d.).
      </p>
      <p>
        These advancements in generative AI reflect an ongoing trend toward
        giving users more control over generated content, whether through
        fine-tuning, prompt modification, or multi-modal model interactions.
      </p>
    </div>
  );
}

export default Overview;
